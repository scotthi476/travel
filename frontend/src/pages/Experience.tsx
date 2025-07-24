import React, { useState } from "react"
import "../App.css"
import { useUserContext } from "../hooks/useUserContext"
import { useTripContext } from "../hooks/useTripContext"
import type { Experience } from "../types";

// TODO: Syme add form for CRUD operation
// Followed guide to create form: https://dev.to/luqmanshaban/creating-a-sign-up-form-in-react-with-typescript-2jb3
// Followed guide: https://www.youtube.com/watch?v=R1uTPIOuT8s  React simple CRUD Application

type Props = {
  onSubmitHnd: (data: Experience) => void
};

const Experience = (props: Props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new(Date));
    const [imageUrl, setImageURL] = useState("");
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [rating, setRating] = useState(0);
    const [keyword, setKeyword] = useState("");

    const {onSubmitHnd} = props;

    const onTitleChangeHnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    };

    const onDescriptionChangeHnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
    };

    const onDateChangeHnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new(Date))
    };

    const onImageURLChangeHnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageURL(e.target.value)
    };

    const onLatitudeChangeHnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLatitude(Number(e.target.value))
    };

    const onLongitudeChangeHnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongitude(Number(e.target.value))
    };

    const onRatingChangeHnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value))
    };

    const onKeywordChangeHnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
    };

    const onAddBtnClickHnd = (e: React.MouseEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data: Experience = {
        title: title,
        description: description,
        date: date,
        imageUrl: imageUrl,
        latitude: latitude,
        longitude: longitude,
        rating: rating,
        keywords: keyword
      }
      onSubmitHnd(data);
}
    const { addTrip } = useTripContext()
    const { user } = useUserContext()
    return (
        <div>
            <br />
            <h1>Create an Experience:</h1>
            <br />
            <form onSubmit={onAddBtnClickHnd}>
                <div>
                    <p>
                        <label htmlFor="title">Title: </label>
                        <br />
                        <input type="text" name="title" id="title" value = {title} onChange={onTitleChangeHnd} required />
                        <br />
                    </p>
                </div>
                <div>
                    <label htmlFor="description">Description: </label>
                    <br />
                    <input
                        type="text"
                        name="description"
                        id="description"
                        value = {description} onChange={onDescriptionChangeHnd}
                        required
                    />
                    <br />
                </div>
                <div>
                    <label htmlFor="date">Date: </label>
                    <br />
                    <input type="date" name="date" id="date" onChange={onDateChangeHnd}required />
                    <br />
                </div>
                <div>
                    <label htmlFor="imageUrl">Image URL: </label>
                    <br />
                    <input type="text" name="imageUrl" id="imageUrl" value = {imageUrl} onChange={onImageURLChangeHnd} required />
                    <br />
                </div>
                <div>
                    <label htmlFor="latitude">Latitude: </label>
                    <br />
                    <input
                        type="number"
                        name="latitude"
                        id="latitude"
                        value = {latitude} onChange={onLatitudeChangeHnd}
                        required
                    />
                    <br />
                </div>
                <div>
                    <label htmlFor="longitude">Longitude: </label>
                    <br />
                    <input
                        type="number"
                        name="longitude"
                        id="longitude"
                        value = {longitude} onChange={onLongitudeChangeHnd}
                        required
                    />
                    <br />
                </div>
                <div>
                    <label htmlFor="rating">Rating: </label>
                    <br />
                    <input type="number" name="rating" id="rating" value = {rating} onChange={onRatingChangeHnd} />
                    <br />
                </div>
                <div>
                    <label htmlFor="keyword">Keyword: </label>
                    <br />
                    <input type="text" name="keyword" id="keyword" value = {keyword} onChange={onKeywordChangeHnd}/>
                    <br />
                    <br />
                </div>
                <input type = "submit" value = "Submit"/> 
            </form>
        </div>
    )
}

export default Experience
