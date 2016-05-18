interface Person {
  firstName: string;
  lastName: string;
}

function greeter (person: Person) {
  return 'Hello, ' + person.firstName + ' ' + person.lastName;
}

var user = { firstName: 'TypeScript', lastName: 'Works' };

console.log(greeter(user));
