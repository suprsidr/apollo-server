import { Students } from './connectors';

const resolvers = {
  Query: {
    student(root, args) {
      return Students.findOne({ sid: args.sid }).then(student => student);
    },
    allStudents() {
      return Students.find({})
        .sort({ 'name.last': 1 })
        .then(students => students);
    },
    search(root, { field, query, sort, direction = 1 }) {
      return Students.find({ [field]: { $regex: query } })
        .sort({ [sort]: direction })
        .then(students => students);
    }
  }
};

export default resolvers;
