using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.Text;

namespace Sample1_1
{
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.Single)]
    public class RESTService : IRESTService
    {
        List<Person> persons = new List<Person> 
        { 
            new Person { ID = "1", Age = "20", Name = "黄文华" },
            new Person { ID = "2", Age = "25", Name = "刘亲秋" },
        };        
        int personCount = 2;

        public Person CreatePerson(Person createPerson)
        {
            createPerson.ID = (++personCount).ToString();
            persons.Add(createPerson);
            return createPerson;
        }

        public List<Person> GetAllPerson()
        {
            return persons.ToList();
        }

        public Person GetAPerson(string id)
        {
            return persons.FirstOrDefault(e => e.ID.Equals(id));
        }

        public Person UpdatePerson(string id, Person updatePerson)
        {
            Person p = persons.FirstOrDefault(e => e.ID.Equals(id));
            p.Name = updatePerson.Name;
            p.Age = updatePerson.Age;
            return p;
        }

        public void DeletePerson(string id)
        {
            persons.RemoveAll(e => e.ID.Equals(id));
        }
    }
}
