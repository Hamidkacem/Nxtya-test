import { useState, useEffect } from "react";

import { userService } from "services";
import IMAGE from "next/image";

function Home() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    userService.getAll().then((x) => setUsers(x));
  }, []);

  return (
    <div className="">
      <div className="">
        <h6 className="text-center font-bold  text-lg py-10">can only be accessed by authenticated users</h6>
        {users && (
          <ul className="flex gap-2 py-10">
            {users.map((user) => (
              <div className="card card-side bg-base-100 shadow-xl ">
                <figure>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnnnObTCNg1QJoEd9Krwl3kSUnPYTZrxb5Ig&usqp=CAU"
                    alt=""
                    height="20"
                    width="20"
                  />
                </figure>
                <div className="card-body">
                  <p>{user.username}</p>
                  <h2 className="card-title">Do you like orange!</h2>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">yes</button>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        )}
        {!users && <div className="spinner-border spinner-border-sm"></div>}
      </div>
    </div>
  );
}
export default Home;
