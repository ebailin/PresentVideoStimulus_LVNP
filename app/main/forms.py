from flask_wtf import FlaskForm
from wtforms.fields import RadioField, SubmitField, SelectField, StringField, HiddenField
from wtforms.validators import ValidationError, Email, EqualTo, Optional, Length, InputRequired
from wtforms.fields.html5 import DateField, IntegerField
import datetime


class SubjectInfoForm(FlaskForm):
    test = RadioField(
        id="test", choices=[
            ('Y', 'yes!'), ('N', 'no')], default="N", validators=[
            InputRequired()])
    groups = SelectField(
        id="groups",
        default=[
            ('',
             "--")],
        choices=[
            ('',
             "--"),
            ('c',
             'CVI'),
            ('o',
             'OVI'),
            ('x',
             'Control')],
        validators=[
            InputRequired()])
    sex = RadioField(
        id="sex", choices=[
            ('M', 'male'), ('F', 'female')], validators=[
            Length(
                min=1)])
    initials = StringField(
        id="initials", validators=[
            InputRequired(), Length(
                max=2, min=1)])
    dob = DateField(id="bday", format='%m/%d/%Y', validators=[InputRequired()])
    scanDate = DateField(
        id="scan-day",
        format='%m/%d/%Y',
        default=datetime.datetime.now(),
        validators=[
            InputRequired()])
    runNum = IntegerField(id="runNum", validators=[InputRequired()])
    version = SelectField(
        id="run_options",
        default=[
            ('',
             "--")],
        choices=[
            ('',
             "--"),
            ("A",
             "A"),
            ("B",
             "B"),
            ("TEST",
             "TEST")],
        validators=[
            Optional()])
    subid = StringField(id="subID", validators=[Length(min=2)])
    go = SubmitField(id="go")
    editSubId = SubmitField(id="id_edit", label="edit")
    editDay = SubmitField(id="day_edit", label="edit")
    reset_Form = SubmitField(id="reset_Form", label="RESET FORM")
    submit = SubmitField(id="submit")


class ReturnForm(FlaskForm):
    submit = SubmitField(id="submit")


class ContinuingRunForm(FlaskForm):
    nextRun = SubmitField(id="next", label="Next Run?")
    done = SubmitField(id="done", label="Done!")
    redo = SubmitField(id="redo", label="Reset")
