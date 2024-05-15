import React, { useState, useEffect } from "react";
import { getPostsByMajor, getCurrentUser, getAllEventsUsers } from "../../api/FirestoreAPI";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { Link } from "react-router-dom";

export default function Majoring({ major }) {
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllEventUsers] = useState([]);
  const [imageModal, setImageModal] = useState(false);
  const [resources, setPostByMajor] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await getPostsByMajor(setPostByMajor, major);
      await getCurrentUser(setCurrentUser);
      await getAllEventsUsers(setAllEventUsers);
    };
    fetchData();
  }, [major]);

  function organizeMajorResourcesByLevel(majorResources) {
    const resourcesByLevel = {};

    majorResources.forEach(majorResource => {
      const { title, level, id, url, subject, about, imagelink } = majorResource; // Assuming each major resource has name, level, and id fields
      if (!resourcesByLevel[level]) {
        resourcesByLevel[level] = [];
      }
      resourcesByLevel[level].push({ title, id, url, subject, about, imagelink }); // Pushing an object with name and id instead of just name
    });

    return Object.keys(resourcesByLevel).map(level => (
      <div key={`level-${level}`}>
        {level == 0 ? (
          <h2>All Levels</h2>
        ) : (
          <h2>Level {level}</h2>
        )}
        <div className="resource-container">
          
          {resourcesByLevel[level].map((resource, index) => (
           <div key={`${resource.title}-${index}`} className="resource-item">
             <div className="resource-subject">
             <p>{resource.subject}</p>
           </div>
           <div>
         
         </div>


              {resource.url && (resource.imagelink ? (
                <img src={resource.imagelink} alt="Website Logo" style={{ width: 'auto', height: '50px', marginTop: '10px' }} />
              ) : (
                <img src={`https://www.google.com/s2/favicons?domain=${resource.url}`} alt="Website Logo" style={{ width: 'auto', height: '50px', marginTop: '10px' }} />
              ))}
              <h3 className="resource-title">{resource.title}</h3>
              <p className="resource-about">{resource.about}</p>
              <button className="majoring-button" onClick={() => window.open(resource.url, '_blank')}>
                Explore More
              </button>
            </div>
          ))}
        </div>
        {parseInt(level) !== Object.keys(resourcesByLevel).length && <hr />}
      </div>
    ));
  }

  const organizedMajorResources = organizeMajorResourcesByLevel(resources);

  return (
    <div className="majoring-container">
        <Link  to={`/resources`} className="grid-item">
        <button 
  className="majoring-button" 
  style={{ 
    width: '100%', 
    padding: '12px', 
    backgroundColor: 'blue', 
    color: 'white', 
    border: 'none', 
    borderRadius: '25px', 
    fontSize: '18px', 
    fontWeight: 'bold', 
    cursor: 'pointer', 
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', 
    transition: 'background-color 0.3s ease',
    outline: 'none',
    margin:"0px"
  }} 
  onClick={() => navigate('/')}
>
  All Majors
</button>

          </Link>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', textAlign: 'center', margin: '20px 0' }}>{major} Resources Available</h2>
      </div>
      <div>
        {organizedMajorResources}
      </div>
    </div>
  );
}
