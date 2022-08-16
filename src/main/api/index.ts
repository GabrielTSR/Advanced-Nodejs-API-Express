import '../config/module-alias';
import { PersonController } from '../../application/controllers/person';

const p = new PersonController();
p.speak('Rodrigo');
p.speak();
