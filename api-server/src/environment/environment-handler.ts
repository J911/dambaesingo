import * as yaml from 'js-yaml'
import * as fs from 'fs'

export default yaml.safeLoad(fs.readFileSync(__dirname + '/environment.yml', 'utf8'));
