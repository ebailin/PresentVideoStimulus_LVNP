from flask import  Flask, request, current_app
from config import Config
from flask_bootstrap import Bootstrap
import logging
from logging.handlers import SMTPHandler, RotatingFileHandler, TimedRotatingFileHandler
import os

bootstrap=Bootstrap()

def create_app(config_class=Config):
	app=Flask(__name__)
	app.config.from_object(config_class)

	bootstrap.init_app(app)

	from app.main import bp as main_bp
	app.register_blueprint(main_bp)

	#make loging file to keep all failure conditions, even if they don't require an email
	if not os.path.exists('logs'):
		os.mkdir('logs')

	file_handler=TimedRotatingFileHandler('logs/hallway_fmri.log', when='h', backupCount=10)
	file_handler.setFormatter(logging.Formatter(
		'%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]')) 
	file_handler.setLevel(logging.INFO)
	app.logger.addHandler(file_handler)

	app.logger.setLevel(logging.INFO)
	app.logger.info('startup')
	
	return app