from flask import render_template, flash, redirect, url_for, current_app, request, make_response
from app.main import bp
from app.main.forms import SubjectInfoForm, ReturnForm, ContinuingRunForm
from os import path
import json


@bp.route('/')
def index():
    # render_template("hallway_fmri_stim.html", form=SubjectInfoForm)
    return redirect(url_for("main.subject_info"))


@bp.route('/info')
def subject_info():
    # displayLocation=url_for("hallway_fmri_stim_playRuns")
    form = SubjectInfoForm()
    print("version: ", request.form.get("version"))
    print("version: ", request.args.get("version"))
    result = request.data
    print("request: ", request.args)

    if (request.cookies.get("downloaded" == "True")):
        if request.cookies.get("test") == "N":
            form.runNum.data = request.args.get('runNum')
            form.subid.data = request.args.get('subid')
            subj_form.set_cookie("new", "False")
        else:
            form.subid.data = request.args.get('subid')
        request.cookies.set("downloaded", "False")

        return redirect(url_for("main.subject_info"))

    elif (request.cookies.get("subjid") and (request.args.get("version") is not None)):
        print("version: ", request.args.get("version"))
        inputs = request.args
        inputs = inputs.to_dict()
        data = "?"
        for inp in inputs.keys():
            print([inp, "=", inputs[inp]])
            data = data + "&" + "".join([inp, "=", inputs[inp]])

        print("data: ", data.encode("ascii"))

        play_form = redirect(
            url_for(
                "main.render_videos",
                version=request.args.get('version')))
        # play_form=url_for("main.render_videos", version=request.args.get('version'))
        # play_form=make_response(url_for("main.render_videos", version=request.args.get('version')))
        play_form.set_cookie("inputs", data)
        print("HERE RETURNING")
        return play_form

        # return redirect(url_for("main.render_videos", version=request.args.get('version'), inputs=data.encode("ascii")))
        # return render_videos(request.args.get('version'), inputs=data)

    subj_form = make_response(
        render_template(
            "hallway_fmri_stim.html",
            form=form))
    subj_form.set_cookie("new", "True")

    # return make_response(render_template("hallway_fmri_stim.html",
    # form=form))
    return subj_form


@bp.route('/play/run<version>')
def render_videos(version):
    print("HERE!!")
    form = ReturnForm()
    # print("form: ", form)
    clipLocation = url_for(
        "static",
        filename="fMRI_Hallway_all_updated_clips/")
    source = url_for(
        "static",
        filename="fMRI_Hallway_all_updated_clips/BLANK_HALLWAY.mp4")

    # with open(path.join(current_app.static_folder, "runOrders.json")) as f:
    # 	orders=json.load(f)

    print("request(in render_videos: ", request.args)
    print("request.form: ", request.form)
    # if(request.cookies.get('downloaded')):
    # if form.validate_on_submit():
    # if (request.form.method) == "post":
    # return redirect(url_for("main.subject_info"))

    return render_template(
        "hallway_fmri_stim_playRuns.html",
        source=source,
        path=clipLocation,
        version=version,
        form=form)


@bp.route('/play/next')
def get_next_action():
    form = ContinuingRunForm()
