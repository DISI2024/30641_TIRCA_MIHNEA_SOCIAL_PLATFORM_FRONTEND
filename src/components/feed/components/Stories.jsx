import "../styles/Stories.css";

const Stories = () => {

    //Mock data
    const stories =[
        {
            id:1,
            name: "Spaczai Carla",
            img:"https://i.pinimg.com/564x/39/11/6c/39116c247669762f4ce72be4ce2b862e.jpg"
        },
        {
            id:2,
            name: "Tirca Mihnea",
            img:"https://i.pinimg.com/564x/25/5b/08/255b088a8458ad022198609462e11f3c.jpg"
        },
        {
            id:3,
            name: "Stefan Razvan",
            img:"https://i.pinimg.com/564x/f5/ca/13/f5ca135ce854a69bc937bf33199b992b.jpg"
        },
        {
            id:4,
            name: "Codrea Andrei",
            img:"https://i.pinimg.com/564x/9e/e6/dd/9ee6dda86b2cb138ba2a915f44e1fd56.jpg"
        }
    ]
    return (
        <div className="stories">
            <div className="story">
                <img src="https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg" alt=""/>
                <span>John Doe</span>
                <button>+</button>
            </div>
            {stories.map(story => (
                <div className="story" key={story.id}>
                    <img src={story.img} alt="" />
                    <span>{story.name}</span>
                </div>
            ))}
        </div>
    )
}
export default Stories