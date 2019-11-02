from flask import render_template, flash, redirect, url_for, current_app, request
from app.main import bp
from app.main.forms import SubjectInfoForm

@bp.route('/')
def index():
	return redirect(url_for("main.subject_info"))#render_template("hallway_fmri_stim.html", form=SubjectInfoForm)

@bp.route('/info')
def subject_info():
	form=SubjectInfoForm()
	# result=request.data
	# print(result)

	if form.validate_on_submit():
		print("validated")
	# if request.method=="get":
		result=request.form.data
		print(result)

	elif request.method=="get":
		print("get")
		print("request.data: ", request.data)
		form.groups.data=request.form['groups']
		form.sex.data=request.form['sex']
		form.initials.data=request.form['initials']
		form.dob.data=request.form['bday']
		return redirect(url_for("main.subject_info"))

	return render_template("hallway_fmri_stim.html", form=form)