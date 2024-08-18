import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="container-fluid" id="home">
        <div className="HomeDiv container-fluid">
          <div className="Hometext container-fluid">
            <h1>
              Pet Registration Portal
              <br />
            </h1>
             <h3> <small className="text-muted">Let&apos;s get those paws officially on the map!</small> </h3> 

            <div className="mainText"> 
              <p>
                It is mandatory for pet parents to register their pets with ULB.
                The online form allows pet owners to register their pets from the
                comfort of their home. Both applicant&apos;s and pet
                details are requested for the pet registration<br/> <br/>
                To create an account Sign up. If you already have an account go ahead and register your pet.
              </p>
            </div>
            <div className="HomeBtn-container">
              <Link to="/register">
                <button type="button">Sign up</button>
              </Link>
              <Link to="/pet-register">
              <button type="button">Pet Register</button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Home;
