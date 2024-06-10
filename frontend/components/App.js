// ❗ IMPORTANT
// The ✨ tasks found inside this component are not in order.
// Check the README for the appropriate sequence to follow.
import React, { useState, useEffect } from 'react';

const App = () => {
  // State for form values and editing
  const [formValues, setFormValues] = useState({ fname: '', lname: '', bio: '' });
  const [editing, setEditing] = useState(null);
  const [members, setMembers] = useState([]);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  // Submit new member
  const submitNewMember = (e) => {
    e.preventDefault();
    const newMember = { id: Date.now(), ...formValues };
    setMembers([...members, newMember]);
    setFormValues({ fname: '', lname: '', bio: '' });
  };

  // Edit existing member
  const editExistingMember = (e) => {
    e.preventDefault();
    const updatedMembers = members.map(member =>
      member.id === editing ? { ...member, ...formValues } : member
    );
    setMembers(updatedMembers);
    setEditing(null);
    setFormValues({ fname: '', lname: '', bio: '' });
  };

  // Handle submit
  const handleSubmit = (e) => {
    if (editing !== null) {
      editExistingMember(e);
    } else {
      submitNewMember(e);
    }
  };

  // Effect hook to populate form when editing
  useEffect(() => {
    if (editing === null) {
      setFormValues({ fname: '', lname: '', bio: '' });
    } else {
      const memberToEdit = members.find(member => member.id === editing);
      if (memberToEdit) {
        setFormValues({
          fname: memberToEdit.fname,
          lname: memberToEdit.lname,
          bio: memberToEdit.bio
        });
      }
    }
  }, [editing, members]);

  // Edit function to set editing state
  const edit = (id) => {
    setEditing(id);
  };

  return (
    <div>
      <h1>{editing !== null ? 'Edit Team Member' : 'Create New Team Member'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fname">First Name:</label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={formValues.fname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lname">Last Name:</label>
          <input
            type="text"
            id="lname"
            name="lname"
            value={formValues.lname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={formValues.bio}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">{editing !== null ? 'Save Changes' : 'Create Member'}</button>
      </form>
      <h2>Team Members</h2>
      <ul>
        {members.map(member => (
          <li key={member.id}>
            {member.fname} {member.lname}
            <button onClick={() => edit(member.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
