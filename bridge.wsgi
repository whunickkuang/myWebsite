activate_this = '/var/www/bridge/venv/bin/activate_this.py'
execfile(activate_this, dict(__file__=activate_this))
import sys
sys.path.insert(0, '/var/www/bridge')
from manage import app as application

import logging, sys
logging.basicConfig(stream=sys.stderr)