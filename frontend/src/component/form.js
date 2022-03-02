import React from 'react'
import { useState } from 'react';

const Form = () => {
    const [userForm, setuserForm] = useState({
        title: "", description: "", status: ""
    });

    let name, value;
    const handleInput = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setuserForm({ ...userForm, [name]: value });
    }
   
    const PostData = async (e) => {
        try {
            e.preventDefault();
            const { title, description, status } = userForm;
            const res = await fetch("createForm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title, description, status
                })
            })

            const data = await res.json();

            if (data.name === 404 && !data) {
                window.alert("fill Form details");
            } else {
                window.alert(" Form Successfull saved");
            }
        } catch (error) {
            console.log("error" + error)
        }

    }

    return (
        <>
            <section className="Form">
                <div className='container mt-5'>

                </div>
            </section>
            <form method="POST" action="" >
                <div>
                    <label htmlfor="title">Title</label>
                    <input type="text"
                        value={userForm.title}
                        onChange={handleInput}
                        //autoComplete="off"
                        name="title" id="title"
                        placeholder="Your title" />
                </div>
                <div>
                    <label htmlfor="description">Description</label>
                    <input type="text"
                        value={userForm.description}
                        onChange={handleInput}
                        //autoComplete="off"
                        name="description" id="description"
                        placeholder="Your description" />
                </div>
                <div>
                    <label htmlfor="status">Status</label>
                    <input type="text"
                        value={userForm.status}
                        onChange={handleInput}
                        //autoComplete="off"
                        name="status" id="status"
                        placeholder="Your status" />

                </div>


                <div>
                    <button>
                        <input type="Submit" name="submit" id="submit" value="Submit" onClick={PostData}
                        />
                    </button>
                </div>
            </form>


        </>

    )
}
 

export default Form
