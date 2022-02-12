import { useState, useEffect } from "react";
import axios from "axios";

// components
import Navbar from "../components/Navbar";
import List from "../components/List";
import Form from "../components/Form";
import DeleteModal from "../components/DeleteModal";
import Pagination from "../components/Pagination";

const baseURL = "http://127.0.0.1:5000";

const HomePage = () => {
  const [list, setList] = useState({});
  const [itemId, setItemId] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    refreshList();
  }, []);

  // refresh list
  const refreshList = () => {
    axios
      .get(baseURL + "/api/recent")
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // predict result
  const predictResult = async (inputs) => {
    await axios
      .post(baseURL + "/api/predict", {
        ...inputs,
      })
      .then(async (response) => {
        if (inputs["save"]) {
          let date = new Date(Date.now() + 19800000).toISOString().replace("T", " ").replace("Z", " ").slice(0, 19);
          if (response.data && response.data > 0) {
            await axios
              .post(baseURL + "/api/save", {
                createdAt: date,
                outcome: {
                  status: "success",
                  value: response.data.toFixed(3),
                },
                inputs: {
                  scanSpeed: inputs["scanSpeed"],
                  hatchDistance: inputs["hatchDistance"],
                  laserPower: inputs["laserPower"],
                  layerThickness: inputs["layerThickness"],
                },
              })
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
          } else {
            await axios
              .post(baseURL + "/api/save", {
                createdAt: date,
                outcome: {
                  status: "failed",
                  value: "",
                },
                inputs: {
                  scanSpeed: inputs["scanSpeed"],
                  hatchDistance: inputs["hatchDistance"],
                  laserPower: inputs["laserPower"],
                  layerThickness: inputs["layerThickness"],
                },
              })
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
          }
        }
      })
      .catch((err) => console.log(err));
    refreshList();
  };

  // delete item
  const deleteById = async (id) => {
    await axios.delete(baseURL + `/api/clear/${id}`);
    refreshList();
  };

  // drilling id
  const getId = (id) => {
    setItemId(id);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      <div className="container row">
        <main className="container ml-1 mr-1 col-9">
          <p className="text-center text-secondary">{Object.keys(list).length > 0 ? "recent predictions" : "No recent predictions"}</p>
          {Object.keys(list).length > 0 ? <List data={list} getId={getId} indexOfFirstPost={indexOfFirstPost} indexOfLastPost={indexOfLastPost} /> : <></>}
        </main>
        <div className="col-2 mt-3">
          <button
            className="btn btn-dark rounded-circle shadow position-fixed"
            data-bs-toggle="modal"
            data-bs-target="#formModal"
            data-bs-placement="top"
            title="add new prediction">
            <span>
              <i className="fas fa-plus text-white"></i>
            </span>
          </button>
        </div>
      </div>
      <Form predictResult={predictResult} />
      <DeleteModal deleteById={deleteById} itemId={itemId} />
      <div className="row fixed-bottom bg-light align-items-center pt-2">
        <div className="col-8 mt-2">
          <p className="text-center">Navigate through pages</p>
        </div>
        <div className="col-4 mt-2">
          <Pagination postsPerPage={postsPerPage} totalPosts={Object.keys(list).length} paginate={paginate} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
