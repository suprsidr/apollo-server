import { Students } from "./connectors";

const resolvers = {
  Query: {
    student(root, args) {
      return Students.findOne({ sid: args.sid }).then(student => student);
    },
    allStudents() {
      return Students.find({}).then(students => students);
    }
  }
};

export default resolvers;
