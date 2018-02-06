import { Students } from './connectors';
import uuid from 'uuid';

const errorResponse = { ok: false, error: 'Oops something went wrong!' };

const resolvers = {
  Query: {
    student(_, args) {
      return Students.findOne({ sid: args.sid }).then(student => student);
    },
    allStudents() {
      return Students.find({})
        .sort({ 'name.last': 1 })
        .then(students => students);
    },
    search(_, { field, query, sort, direction = 1 }) {
      return Students.find({ [field]: { $regex: query } })
        .sort({ [sort]: direction })
        .then(students => students);
    }
  },
  Mutation: {
    addStudent(_, { input: student }) {
      console.log(student);
      student.sid = uuid.v4();
      student.modified = student.registered = Date.now();
      student.dob = new Date(student.dob); //Date.parse(student.dob);

      return Students.create(student).then(result => {
        console.log(result);
        return result;
      });
    },
    updateStudent(_, { input: student }) {
      student.modified = Date.now();
      return Students.update({ sid: student.sid }, { $set: student }).then(
        ({ result }) => {
          console.log(result);
          return result;
        }
      );
    },
    deleteStudent(_, { input: { sid } }) {
      return Students.remove({ sid: sid })
        .then(({ result }) => {
          if (result.ok && result.n > 0) {
            return { ok: true, error: '' };
          }
          return errorResponse;
        })
        .catch(err => {
          return errorResponse;
        });
    }
  }
};

export default resolvers;
