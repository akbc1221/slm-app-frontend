import { useState, useEffect } from "react";
import axios from "axios";
import baseURL from "../shared/endpoint.js";

// components
import Navbar from "../components/Navbar";
import List from "../components/List";
import Form from "../components/Form";
import DeleteModal from "../components/DeleteModal";
import Pagination from "../components/Pagination";
import AlertBar from "../components/AlertBar";
import SearchForm from "../components/SearchForm";

// const baseURL = "http://127.0.0.1:5000";

const HomePage = () => {
  document.title = "Predictor App | Home";
  const [list, setList] = useState({});
  const [itemId, setItemId] = useState(-1);
  const [deleteAllFlag, setDeleteAllFlag] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState("");
  const [formRefill, setFormRefill] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

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
                  value: response.data,
                },
                inputs: {
                  scanSpeed: inputs["scanSpeed"],
                  hatchDistance: inputs["hatchDistance"],
                  laserPower: inputs["laserPower"],
                  layerThickness: inputs["layerThickness"],
                },
                tags: inputs["tags"],
              })
              .then((res) => {
                console.log(res);
              })
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
                tags: inputs["tags"],
              })
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
          }
        }
        setAlert(response.data);
      })
      .catch((err) => console.log(err));
    setShowAlert(true);
    setFormRefill("");
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

  //delete all recent
  const deleteAll = async () => {
    await axios.delete(baseURL + "/api/clear/all");
    setDeleteAllFlag(false);
    refreshList();
  };

  // clone result
  const makeClone = async (id) => {
    await axios
      .get(baseURL + `/api/recent/${id}`)
      .then((response) => {
        setFormRefill(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // star recent
  const starResult = async (id) => {
    await axios
      .patch(baseURL + `/api/update/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    refreshList();
  };

  // search
  const searchResult = async (queryParams) => {
    axios
      .get(baseURL + "/api/search" + queryParams)
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // loader
  const loadSpinner = async () => {
    setShowSpinner(true);
    setTimeout(() => {
      refreshList();
      setShowSpinner(false);
    }, 1800);
  };
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar searchResult={searchResult} />
      {showAlert && <AlertBar alert={alert} />}
      <div className="container row">
        <main className="container ml-1 mr-1 col-9">
          <p className="text-center text-secondary">{Object.keys(list).length > 0 ? "recent predictions" : "No recent predictions"}</p>
          {Object.keys(list).length > 0 ? (
            <List data={list} getId={getId} indexOfFirstPost={indexOfFirstPost} indexOfLastPost={indexOfLastPost} makeClone={makeClone} starResult={starResult} />
          ) : (
            <></>
          )}
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
          {!showSpinner ? (
            <button
              className="btn position-fixed mt-5"
              title="refresh list"
              onClick={async () => {
                await loadSpinner();
              }}>
              <i className="fas fa-sync-alt fa-lg text-secondary"></i>
            </button>
          ) : (
            <button className="btn position-fixed mt-5" title="loading..." disabled>
              <i className="fas fa-sync-alt fa-lg fa-spin text-danger"></i>
            </button>
          )}
        </div>
      </div>
      <Form predictResult={predictResult} formRefill={formRefill} />
      <SearchForm searchResult={searchResult} />
      <DeleteModal deleteById={deleteById} itemId={itemId} deleteAll={deleteAll} deleteAllFlag={deleteAllFlag} />
      <div className="row fixed-bottom bg-light align-items-center pt-2">
        {Object.keys(list).length > 0 ? (
          <div className="col-4 m-3">
            <button className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" title="clear all recent" onClick={() => setDeleteAllFlag(true)}>
              clear recent
            </button>
          </div>
        ) : (
          <div className="col-4 m-3">
            <button className="btn btn-outline-danger" disabled>
              clear recent
            </button>
          </div>
        )}
        <div className="col-2 mt-2">
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
