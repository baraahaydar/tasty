import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Link from "next/link";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import API from "../API";
import swal from "sweetalert2";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { getServerSidePropsHandler, usePrivacyChecker } from "../utils";

const useStyles = makeStyles({
  productList: {
    flex: 4,
  },

  productListItem: {
    display: "flex",
    alignItems: "center",
  },

  productListImg: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    marginRight: "10px",
  },

  productListEdit: {
    color: "blue",
    cursor: "pointer",
    marginRight: "20px",
  },

  productListDelete: {
    color: "red",
    cursor: "pointer",
  },
});
export const getServerSideProps = async (req, res) => {
  let result = await API.get("product");
  let products = result.data.data;

  return {
    props: {
      products,
    },
  };
};

export default function ProductList(props) {
  usePrivacyChecker();

  const styles = useStyles();

  const [data, setData] = useState(props.products);

  const handleDelete = async (id) => {
    await swal
      .fire({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      })
      .then((result) => {
        if (result.isConfirmed) {
          API.delete(`product/${id}`);

          setData(data.filter((item) => item.id !== id));
          swal.fire(
            "Deleted!",
            "Your imaginary file has been deleted.",
            "success"
          );
        } else if (result.dismiss === swal.DismissReason.cancel) {
          swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
        }
      });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    { field: "description", headerName: "Description", width: 200 },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 120,
    },
    {
      field: "photo",
      headerName: "Photo",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={styles.productListItem}>
            <img
              className={styles.productListImg}
              src={`http://localhost:8000/storage/uploads/${params.row.photo}`}
              alt=""
            />
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
        
            <Link href={"/product/" + params.row.id}>
              <IconButton>
                <EditIcon style={{ color: "blue" }} />
              </IconButton>
            </Link>
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon style={{ color: "red" }} />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div>
       
      </div>
      <div className={styles.productList}>
      <Link href="/newproduct">
    <Button variant="contained" color="primary">
      Create
    </Button>
  </Link>
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
        />
      </div>
    </>
  );
}
ProductList.layout = "default";