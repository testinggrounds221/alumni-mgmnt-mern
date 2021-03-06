import React, { useState } from "react";

export const Record = ({ onSubmit, user, ...props }) => {
  //let clNames = ["", "TCE", "SRM", "VIT", "MIT"];
  const [auth, setAuth] = useState(user.authenticated);

  let dpNames = ["", "IT", "CS", "Mech", "Civil"];

  return (
    <tr className="text-center">
      <td>{user.firstName}</td>
      <td>{user.passOutYear}</td>
      <td>{dpNames[parseInt(user.departmentId[1])]}</td>
      <td>
        {!auth && (
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={(e) => {
              e.preventDefault();
              setAuth(true);
              onSubmit(user._id, true);
            }}
          >
            Authenticate
          </button>
        )}
        {auth && (
          <button
            type="button"
            className="btn btn-outline-secondary text-white"
            onClick={(e) => {
              e.preventDefault();
              setAuth(false);
              onSubmit(user._id, false);
            }}
          >
            Remove Auth
          </button>
        )}
      </td>
      <td>
        <a
          href="https://www.linkedin.com/"
          rel="noreferrer"
          target="_blank"
          className="btn btn-outline-info"
        >
          Linked In
        </a>
      </td>
      <td>
        <a
          href={`https://alumnimgmnt.netlify.app/publicprofile/${user._id}`}
          rel="noreferrer"
          target="_blank"
          className="btn btn-outline-light"
        >
          View Profile
        </a>
      </td>
    </tr>
  );
};
