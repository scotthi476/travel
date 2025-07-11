import React from "react"
import "../App.css"

// TODO: Syme add form for CRUD operation
// Followed guide to create form: https://dev.to/luqmanshaban/creating-a-sign-up-form-in-react-with-typescript-2jb3

const Experience = () => {
    return ( 
        <div>
            <br/>
            <h1>Create an Experience:</h1>
            <br/>
            <form>
                <div>
                    <p>
                    <label htmlFor="title">Title: </label>
                    <br/>
                    <input type="text" name="title" id="title" required/>
                    <br/>
                    </p>
                </div>
                <div>
                    <label htmlFor="description">Description: </label>
                    <br/>
                    <input type="text" name="description" id="description" required/>
                    <br/>
                </div>
                <div>
                    <label htmlFor="date">Date: </label>
                    <br/>
                    <input type="date" name="date" id="date" required/>
                    <br/>
                </div>               
                <div>
                    <label htmlFor="imageUrl">Image URL: </label>
                    <br/>
                    <input type="text" name="imageUrl" id="imageUrl" required/>
                    <br/>
                </div>
                <div>
                    <label htmlFor="latitude">Latitude: </label>
                    <br/>
                    <input type="number" name="latitude" id="latitude" required/>
                    <br/>
                </div>
                <div>
                    <label htmlFor="longitude">Longitude: </label>
                    <br/>
                    <input type="number" name="longitude" id="longitude" required/>
                    <br/>
                </div>
                <div>
                    <label htmlFor="rating">Rating: </label>
                    <br/>
                    <input type="number" name="rating" id="rating"/>
                    <br/>
                </div>
                <div>
                    <label htmlFor="keyword">Keyword: </label>
                    <br/>
                    <input type="text" name="keyword" id="keyword"/>
                    <br/>
                    <br/>
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Experience
