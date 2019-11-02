from flask_wtf import FlaskForm
from wtforms.fields import RadioField, SubmitField, SelectField, StringField, HiddenField
from wtforms.validators import ValidationError, Email, EqualTo, Optional, Length, InputRequired
from wtforms.fields.html5 import DateField
from datetime import date 

class SubjectInfoForm(FlaskForm):
	test=RadioField(id="test", choices=[('y','yes!'), ('n','no')], default="no")
	groups=SelectField(id="groups", default=[('', "--")], choices=[('', "--"),('c', 'CVI'), ('o', 'OVI'), ('x', 'Control')], validators=[Length(min=1)])
	sex=RadioField(id="sex", choices=[('M','male'), ('F','female')], validators=[Length(min=1)])
	initials=StringField(id="initials", validators=[Optional(), Length(max=2)])
	dob=DateField(id="bday", format='%m/%d/%Y')
	subid=HiddenField(id="subID", validators=[InputRequired()])
	go=SubmitField(id="go")