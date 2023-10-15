import React, { useState, useEffect } from "react";
import Table from "./Table";

// had to bring
import { auth, db } from "../firebase/firebase";
import {
  getDocs,
  collection,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { setUserData } from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagenation";

const TableMenu = () => {
  const user = useSelector((state) => state.auth.user);
  const [expenseList, setExpenseList] = useState([]);
  const [date, setDate] = useState();
  const [name, setName] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = expenseList.slice(indexOfFirstPost, indexOfLastPost);

  //

  //

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //////

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/expenses");
    }
  }, [auth]);

  const expenseCollectionRef = collection(db, "expenses");
  const getExpenseList = async () => {
    try {
      const data = await getDocs(expenseCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setExpenseList(filteredData);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const expenseDeleteHandler = async (id) => {
    const expenseDocRef = doc(db, "expenses", id);

    if (confirm("Are you sure ")) {
      const res = await deleteDoc(expenseDocRef);
      getExpenseList();

      console.log(res);
    }
  };

  const expenseEditHandler = async (id) => {
    const expenseEditRef = doc(db, "expenses", id);
    const data = await getDoc(expenseEditRef);
    const filteredData = data.data();
    console.log(filteredData);

    dispatch(setUserData({ ...filteredData, id: id }));
    navigate("/edit");
  };

  useEffect(() => {
    getExpenseList();
  }, []);

  // useEffect(() => {
  //   if (!date) {
  //     getExpenseList();
  //   }
  //   const filterData = expenseList.filter(
  //     (list) => list.dateOfExpenses === date
  //   );
  //   setExpenseList(filterData);
  // }, [date]);

  useEffect(() => {
    if (!date) {
      getExpenseList();
    }
    const filterData = expenseList.filter(
      (list) => list.dateOfExpenses === date
    );
    setExpenseList(filterData);
  }, [date]);

  useEffect(() => {
    if (!name) {
      getExpenseList();
    }

    const filterData = expenseList?.filter((list) =>
      list?.name?.toUpperCase().match(name?.toUpperCase())
    );
    setExpenseList(filterData);
  }, [name]);

  return (
    <div>
      <div className="pt-[24%] md:pt-[12%] flex justify-center  gap-4  ">
        <div className=" w-[90%] md:w-[90%] lg:w-[80%] flex flex-col gap-6 md:flex-row justify-between  ">
          <div>
            <h2 className="font-semibold text-[1.2rem] md:text-[1.4rem]">
              My Expense Manager
            </h2>
          </div>
          <div className="flex  flex-wrap-reverse md:flex-row gap-4 items-center justify-end">
            <div className="h-[30px] w-[160px]  text-black  ">
              <input
                onChange={(event) => setDate(event.target.value)}
                onClick={() => getExpenseList()}
                type="date"
                placeholder="Filter by date"
                className="bg-gray-200 px-2 py-1 rounded-md"
              />
            </div>
            <div className="h-[32px] w-[160px] md:w-[200px]   ">
              <input
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder="Filter by Item"
                className="w-full h-[32px] px-2 py-1 bg-gray-200  rounded-md  border-2 border-black outline-none text-[14px] md:text-[18px]"
              />
            </div>
            <div>
              <Link to="/new">
                <button className="block  h-[30px] w-[150px] md:w-[180px]  rounded-md bg-green-500 text-white text-[18px] md:text-[20px] font-semibold ">
                  Add Expense
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Table
        expenseList={currentPosts}
        onDelete={expenseDeleteHandler}
        onEdit={expenseEditHandler}
      />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={expenseList.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default TableMenu;
