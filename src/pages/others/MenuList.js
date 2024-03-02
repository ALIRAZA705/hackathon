import React, { useState, useEffect } from "react";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import {useHistory} from "react-router-dom";
import {
  Block,
  BlockHead,
  BlockTitle,
  BlockBetween,
  BlockHeadContent,
  BlockDes,
  Icon,
  Row,
  Col,
  Button,
  DataTableHead,
  DataTableBody,
  DataTableRow,
  DataTableItem,
  PaginationComponent, PreviewCard,
} from "../../components/Component";
import {
  Card,
  DropdownItem,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Badge,
  Spinner,
  Alert
} from "reactstrap";
import { productData, categoryOptions } from "../pre-built/products/ProductData";
import SimpleBar from "simplebar-react";
import { useForm } from "react-hook-form";
import ProductH from "../../images/product/h.png";
import Dropzone from "react-dropzone";
import { Modal, ModalBody } from "reactstrap";
import { RSelect } from "../../components/Component";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setBusiness, setUser} from "../../store/state/userInfo";
import {deleteMenuItem, getMenuItemsByRestId} from "../../api/menu/menu";
import {menuTableDataMapper} from "../../helper/menuTableHelper";
import {Box} from "@mui/material";
import AddMenuItemForm from "../components/AddMenuItemForm";
import { IMG_STORAGE_BASE_URL } from "../../config";

const MenuList = (props) => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.userInfo)
  const [data, setData] = useState([]);
  const [smOption, setSmOption] = useState(false);
  const [errorVal, setError] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    img: null,
    sku: "",
    price: 0,
    stock: 0,
    category: [],
    fav: false,
    check: false,
  });
  const [editId, setEditedId] = useState();
  const [view, setView] = useState({
    edit: false,
    add: false,
    details: false,
  });
  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(()=>{
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    dispatch(setUser(user));
    if(user.busines){
      dispatch(setBusiness(user.busines));
    }
  },[user])

  useEffect(async()=>{
    setLoading(true);
    const res = await getMenuItemsByRestId(params);
    console.log("here is the refre",res)
    if(res.status === 200){
      // const menuList = res.data.records.data[0].restaurant_menue;
      // setSelectedRestaurant(res.data.records.data[0]);
      setData(res?.data?.domains);
    }
    else{
      let err = res.response.data.error ? JSON.stringify(res.response.data.error) : "Error getting Restaurants";
    }
    setLoading(false);
  },[])

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = productData.filter((item) => {
        return item.sku.toLowerCase().includes(onSearchText.toLowerCase());
      });
      setData([...filteredObject]);
    } else {
      setData([...data]);
    }
  }, [onSearchText]);

  const handleAddProduct = () => {
    history.push(`${process.env.PUBLIC_URL}/restaurant/${params.id}/menu/add`)
  }

  // OnChange function to get the input data
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // category change
  const onCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setView({ edit: false, add: false, details: false });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      img: null,
      sku: "",
      price: "",
      stock: 0,
      category: [],
      fav: false,
      check: false,
    });
  };

  const onFormSubmit = (form) => {
    const { title, price, sku, stock } = form;
    let submittedData = {
      id: data.length + 1,
      name: title,
      img: files.length > 0 ? files[0].preview : ProductH,
      sku: sku,
      price: price,
      stock: stock,
      category: formData.category,
      fav: false,
      check: false,
    };
    setData([submittedData, ...data]);
    setView({ open: false });
    setFiles([]);
    resetForm();
  };

  const onEditSubmit = (form) => {
    const { title, price, sku, stock } = form;
    let submittedData;
    let newItems = data;
    let index = newItems.findIndex((item) => item.id === editId);

    newItems.forEach((item) => {
      if (item.id === editId) {
        submittedData = {
          id: data.length + 1,
          name: title,
          img: files.length > 0 ? files[0].preview : item.img,
          sku: sku,
          price: price,
          stock: stock,
          category: formData.category,
          fav: false,
          check: false,
        };
      }
    });
    newItems[index] = submittedData;
    //setData(newItems);
    resetForm();
    setView({ edit: false, add: false });
  };

  // function that loads the want to editted data
  const onEditClick = (id) => {
    data.forEach((item) => {
      if (item.id === id) {
        setFormData({
          id: item.id,
          item_name: item.name,
          img: item.img,
          sku: item.sku,
          restaurant_menue_variant: item.restaurant_menue_variant,
          regular_price: item.price,
          stock: item.stock,
          category: item.category,
          category_type: item.category_type,
          description: item.description,
          sale_price: item.sale_price,
          fav: false,
          check: false,
        });
      }
    });
    setEditedId(id);
    setFiles([]);
    setView({ add: false, edit: true });
  };

  // selects all the products
  const selectorCheck = (e) => {
    let newData;f
    newData = data.map((item) => {
      item.check = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };

  // selects one product
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].check = e.currentTarget.checked;
    setData([...newData]);
  };

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // function to delete a product
  const deleteProduct = async (id) => {
    let defaultData = data;
    const res = await deleteMenuItem({id});
    if(res.status !== 200){
      let err = res.response.data.message ? (JSON.stringify(res.response.data.message) + ": Error Deleting Menu Item") : "Error Deleting Menu Item";
      setError(err)
      setTimeout(()=>{
        setError("")
      },[2000])
    }
    else{
      defaultData = defaultData.filter((item) => item.id !== id);
      setData([...defaultData]);
    }
  };

  // function to delete the seletected item
  const selectorDeleteProduct = () => {
    let newData;
    newData = data.filter((item) => item.check !== true);
    setData([...newData]);
  };

  // toggle function to view product details
  const toggle = (type) => {
    setView({
      edit: type === "edit" ? true : false,
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };

  // handles ondrop function of dropzone
  const handleDropChange = (acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { errors, register, handleSubmit } = useForm();


  const handleViewProductDetails = (id) => {
    console.log(id);
    window.location.href = `/menu/${id}`;
  }

  return (
    <React.Fragment>
      <Head title="Product List"></Head>
      {
        !loading ? <Box sx={{
              width: "100vw",
              height: "100vh",
              margin: "auto",
              paddingTop: "25%",
              paddingLeft: "50%"
              // textAlign: "center"
            }}>
              Please Wait...&nbsp;&nbsp;&nbsp;
              <Spinner size="sm" color="dark"/>
            </Box> :
            <Content>
              <BlockHead size="sm">
                <BlockBetween>
                  <BlockHeadContent>
                    {/* <BlockTitle>{`${selectedRestaurant.business_name}'s Menu`}</BlockTitle> */}
                  </BlockHeadContent>
                  <BlockHeadContent>
                    <div className="toggle-wrap nk-block-tools-toggle">
                      <a
                          href="#more"
                          className="btn btn-icon btn-trigger toggle-expand mr-n1"
                          onClick={(ev) => {
                            ev.preventDefault();
                            setSmOption(!smOption);
                          }}
                      >
                        <Icon name="more-v"></Icon>
                      </a>
                      <div className="toggle-expand-content" style={{display: smOption ? "block" : "none"}}>
                        <ul className="nk-block-tools g-3">
                          <li>
                            <div className="form-control-wrap">
                              <div className="form-icon form-icon-right">
                                <Icon name="search"></Icon>
                              </div>
                              <input
                                  type="text"
                                  className="form-control"
                                  id="default-04"
                                  placeholder="Quick search by SKU"
                                  onChange={(e) => onFilterChange(e)}
                              />
                            </div>
                          </li>
                          {
                            // user.role !== "super-admin" &&
                            <li className="nk-block-tools-opt">
                              <Button
                                  className="toggle btn-icon d-md-none"
                                  color="primary"
                                  onClick={() => {
                                    toggle("add");
                                  }}
                              >
                                <Icon name="plus"></Icon>
                              </Button>
                              <Button
                                  className="toggle d-none d-md-inline-flex"
                                  color="primary"
                                  onClick={handleAddProduct}
                              >
                                <Icon name="plus"></Icon>
                                <span>Add Domains</span>
                              </Button>
                            </li>
                          }
                        </ul>
                      </div>
                    </div>
                  </BlockHeadContent>
                </BlockBetween>
              </BlockHead>
              <Block>
                {errorVal && (
                    <div className="mb-3">
                      <Alert color="danger" className="alert-icon">
                        {" "}
                        <Icon name="alert-circle" /> {errorVal}{" "}
                      </Alert>
                    </div>
                )}
                <Card className="card-bordered">
                  <Box sx={{
                    px: "2vw"
                  }} className="card-inner-group">
                    <div className="card-inner p-0">
                      <DataTableBody>
                        <DataTableHead>
                          {/*<DataTableRow className="nk-tb-col-check">*/}
                          {/*  <div className="custom-control custom-control-sm custom-checkbox notext">*/}
                          {/*    <input*/}
                          {/*        type="checkbox"*/}
                          {/*        className="custom-control-input form-control"*/}
                          {/*        id="uid_1"*/}
                          {/*        onChange={(e) => selectorCheck(e)}*/}
                          {/*    />*/}
                          {/*    <label className="custom-control-label" htmlFor="uid_1"></label>*/}
                          {/*  </div>*/}
                          {/*</DataTableRow>*/}
                          <DataTableRow size="sm">
                            <span>Image</span>
                          </DataTableRow>
                          <DataTableRow size="sm">
                            <span>Name</span>
                          </DataTableRow>
                          <DataTableRow size="sm">
                            <span>Variants</span>
                          </DataTableRow>
                          <DataTableRow>
                            <span>SKU</span>
                          </DataTableRow>
                          <DataTableRow>
                            <span>Price</span>
                          </DataTableRow>
                          <DataTableRow>
                            <span>Stock</span>
                          </DataTableRow>
                          <DataTableRow size="md">
                            <span>Category</span>
                          </DataTableRow>
                          {/*<DataTableRow size="md">*/}
                          {/*  <Icon name="star-round" className="tb-asterisk"></Icon>*/}
                          {/*</DataTableRow>*/}
                          <DataTableRow className="nk-tb-col-tools">
                            <ul className="nk-tb-actions gx-1 my-n1">
                              <li className="mr-n1">
                                <UncontrolledDropdown>
                                  <DropdownToggle
                                      tag="a"
                                      href="#toggle"
                                      onClick={(ev) => ev.preventDefault()}
                                      className="dropdown-toggle btn btn-icon btn-trigger"
                                  >
                                    <Icon name="more-h"></Icon>
                                  </DropdownToggle>
                                  <DropdownMenu right>
                                    <ul className="link-list-opt no-bdr">
                                      <li>
                                        <DropdownItem tag="a" href="#edit" onClick={(ev) => ev.preventDefault()}>
                                          <Icon name="edit"></Icon>
                                          <span>Edit Selected</span>
                                        </DropdownItem>
                                      </li>
                                      <li>
                                        <DropdownItem
                                            tag="a"
                                            href="#remove"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                              selectorDeleteProduct();
                                            }}
                                        >
                                          <Icon name="trash"></Icon>
                                          <span>Remove Selected</span>
                                        </DropdownItem>
                                      </li>
                                      <li>
                                        <DropdownItem tag="a" href="#stock" onClick={(ev) => ev.preventDefault()}>
                                          <Icon name="bar-c"></Icon>
                                          <span>Update Stock</span>
                                        </DropdownItem>
                                      </li>
                                      <li>
                                        <DropdownItem tag="a" href="#price" onClick={(ev) => ev.preventDefault()}>
                                          <Icon name="invest"></Icon>
                                          <span>Update Price</span>
                                        </DropdownItem>
                                      </li>
                                    </ul>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </li>
                            </ul>
                          </DataTableRow>
                        </DataTableHead>
                        {currentItems.length > 0
                            ? currentItems.map((item) => {
                              return (
                                  // <div >
                                  <DataTableItem key={item.id}>
                                    {/*<DataTableRow className="nk-tb-col-check">*/}
                                    {/*  <div className="custom-control custom-control-sm custom-checkbox notext">*/}
                                    {/*    <input*/}
                                    {/*        type="checkbox"*/}
                                    {/*        className="custom-control-input form-control"*/}
                                    {/*        defaultChecked={item.check}*/}
                                    {/*        id={item.id + "uid1"}*/}
                                    {/*        key={Math.random()}*/}
                                    {/*        onChange={(e) => onSelectChange(e, item.id)}*/}
                                    {/*    />*/}
                                    {/*    <label className="custom-control-label" htmlFor={item.id + "uid1"}></label>*/}
                                    {/*  </div>*/}
                                    {/*</DataTableRow>*/}
                                    <DataTableRow className="nk-tb-col-check">
                              <span className="tb-sub" onClick={() => {
                                // window.location.href = `/menu/${item.id}`
                              }}>
                                <img width="50px" height="45px" src={item.img ? IMG_STORAGE_BASE_URL + item.img : ProductH} alt="product" />
                                {/*<span className="title">{item.name}</span>*/}
                              </span>
                                    </DataTableRow>
                                    <DataTableRow size="md">
                              <span className="tb-product" onClick={() => {
                                // menu page open
                                // window.location.href = `/menu/${item.id}`
                              }}>
                                {/*<img src={item.img ? item.img : ProductH} alt="product" className="thumb"/>*/}
                                <span className="title">{item.name}</span>
                              </span>
                                    </DataTableRow>
                                    <DataTableRow>
                                      <span className="tb-sub">{
                                        item?.restaurant_menue_variant?.map((v)=>(
                                            <div>
                                              {v.variant_name}
                                            </div>
                                        ))
                                        // JSON.stringify(item?.restaurant_menue_variant)
                                      }</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                      <span className="tb-sub">{item.sku}</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                      <span className="tb-sub">$ {item.price}</span>
                                    </DataTableRow>
                                    <DataTableRow>
                                      <span className="tb-sub">{item.stock}</span>
                                    </DataTableRow>
                                    <DataTableRow size="md">
                              <span className="tb-sub">
                                {item.category.map((cat) => {
                                  if (item.category[cat] + 1 === null || undefined) {
                                    return cat.label;
                                  } else return cat.label + ", ";
                                })}
                              </span>
                                    </DataTableRow>
                                    {/*<DataTableRow size="md">*/}
                                    {/*  <div className="asterisk tb-asterisk">*/}
                                    {/*    <a*/}
                                    {/*      href="#asterisk"*/}
                                    {/*      className={item.fav ? "active" : ""}*/}
                                    {/*      onClick={(ev) => ev.preventDefault()}*/}
                                    {/*    >*/}
                                    {/*      <Icon name="star" className="asterisk-off"></Icon>*/}
                                    {/*      <Icon name="star-fill" className="asterisk-on"></Icon>*/}
                                    {/*    </a>*/}
                                    {/*  </div>*/}
                                    {/*</DataTableRow>*/}
                                    <DataTableRow className="nk-tb-col-tools">
                                      <ul className="nk-tb-actions gx-1 my-n1">
                                        <li className="mr-n1">
                                          <UncontrolledDropdown>
                                            <DropdownToggle
                                                tag="a"
                                                href="#more"
                                                onClick={(ev) => ev.preventDefault()}
                                                className="dropdown-toggle btn btn-icon btn-trigger"
                                            >
                                              <Icon name="more-h"></Icon>
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                              <ul className="link-list-opt no-bdr">
                                                <li>
                                                  <DropdownItem
                                                      tag="a"
                                                      href="#edit"
                                                      onClick={(ev) => {
                                                        ev.preventDefault();
                                                        onEditClick(item.id);
                                                        toggle("edit");
                                                      }}
                                                  >
                                                    <Icon name="edit"></Icon>
                                                    <span>Edit Product</span>
                                                  </DropdownItem>
                                                </li>
                                                <li>
                                                  <DropdownItem
                                                      tag="a"
                                                      href="#view"
                                                      onClick={(ev) => {
                                                        ev.preventDefault();
                                                        onEditClick(item.id);
                                                        toggle("details");
                                                      }}
                                                  >
                                                    <Icon name="eye"></Icon>
                                                    <span>View Product</span>
                                                  </DropdownItem>
                                                </li>
                                                <li>
                                                  <DropdownItem
                                                      tag="a"
                                                      href="#remove"
                                                      onClick={(ev) => {
                                                        ev.preventDefault();
                                                        deleteProduct(item.id);
                                                      }}
                                                  >
                                                    <Icon name="trash"></Icon>
                                                    <span>Remove Product</span>
                                                  </DropdownItem>
                                                </li>
                                              </ul>
                                            </DropdownMenu>
                                          </UncontrolledDropdown>
                                        </li>
                                      </ul>
                                    </DataTableRow>
                                  </DataTableItem>

                                  // </div>
                              );
                            })
                            : null}
                      </DataTableBody>
                      <div className="card-inner">
                        {data.length > 0 ? (
                            <PaginationComponent
                                itemPerPage={itemPerPage}
                                totalItems={data.length}
                                paginate={paginate}
                                currentPage={currentPage}
                            />
                        ) : (
                            <div className="text-center">
                              <span className="text-silent">No products found</span>
                            </div>
                        )}
                      </div>
                    </div>
                  </Box>
                </Card>
              </Block>



              {/* <SimpleBar
                  className={`nk-add-product toggle-slide toggle-slide-right toggle-screen-any ${
                      view.add ? "content-active" : ""
                  }`}
              >
                <BlockHead>
                  <BlockHeadContent>
                    <BlockTitle tag="h5">Add Product</BlockTitle>
                    <BlockDes>
                      <p>Add information or update product.</p>
                    </BlockDes>
                  </BlockHeadContent>
                </BlockHead>
                <Block>
                  <form onSubmit={handleSubmit(onFormSubmit)}>
                    <Row className="g-3">
                      <Col size="12">
                        <div className="form-group">
                          <label className="form-label" htmlFor="product-title">
                            Product Title
                          </label>
                          <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                onChange={(e) => onInputChange(e)}
                                ref={register({
                                  required: "This field is required",
                                })}
                                defaultValue={formData.name}
                            />
                            {errors.title && <span className="invalid">{errors.title.message}</span>}
                          </div>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form-group">
                          <label className="form-label" htmlFor="regular-price">
                            Regular Price
                          </label>
                          <div className="form-control-wrap">
                            <input
                                type="number"
                                name="price"
                                ref={register({required: "This is required"})}
                                onChange={(e) => onInputChange(e)}
                                className="form-control"
                                defaultValue={formData.price}
                            />
                            {errors.price && <span className="invalid">{errors.price.message}</span>}
                          </div>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form-group">
                          <label className="form-label" htmlFor="sale-price">
                            Sale Price
                          </label>
                          <div className="form-control-wrap">
                            <input
                                type="number"
                                className="form-control"
                                name="salePrice"
                                onChange={(e) => onInputChange(e)}
                                ref={register({required: "This is required"})}
                                defaultValue={formData.price}
                            />
                            {errors.salePrice && <span className="invalid">{errors.salePrice.message}</span>}
                          </div>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form-group">
                          <label className="form-label" htmlFor="stock">
                            Stock
                          </label>
                          <div className="form-control-wrap">
                            <input
                                type="number"
                                className="form-control"
                                name="stock"
                                onChange={(e) => onInputChange(e)}
                                ref={register({required: "This is required"})}
                                defaultValue={formData.stock}
                            />
                            {errors.stock && <span className="invalid">{errors.stock.message}</span>}
                          </div>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form-group">
                          <label className="form-label" htmlFor="SKU">
                            SKU
                          </label>
                          <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                name="sku"
                                onChange={(e) => onInputChange(e)}
                                ref={register({required: "This is required"})}
                                defaultValue={formData.sku}
                            />
                            {errors.sku && <span className="invalid">{errors.sku.message}</span>}
                          </div>
                        </div>
                      </Col>
                      <Col size="12">
                        <div className="form-group">
                          <label className="form-label" htmlFor="category">
                            Category
                          </label>
                          <div className="form-control-wrap">
                            <RSelect
                                name="category"
                                isMulti
                                options={categoryOptions}
                                onChange={onCategoryChange}
                                //ref={register({ required: "This is required" })}
                            />
                            {errors.category && <span className="invalid">{errors.category.message}</span>}
                          </div>
                        </div>
                      </Col>
                      <Col size="12">
                        <Dropzone onDrop={(acceptedFiles) => handleDropChange(acceptedFiles)}>
                          {({getRootProps, getInputProps}) => (
                              <section>
                                <div {...getRootProps()}
                                     className="dropzone upload-zone small bg-lighter my-2 dz-clickable">
                                  <input {...getInputProps()} />
                                  {files.length === 0 && <p>Drag 'n' drop some files here, or click to select files</p>}
                                  {files.map((file) => (
                                      <div
                                          key={file.name}
                                          className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                                      >
                                        <div className="dz-image">
                                          <img src={file.preview} alt="preview"/>
                                        </div>
                                      </div>
                                  ))}
                                </div>
                              </section>
                          )}
                        </Dropzone>
                      </Col>

                      <Col size="12">
                        <Button color="primary" type="submit">
                          <Icon className="plus"></Icon>
                          <span>Add Product</span>
                        </Button>
                      </Col>
                    </Row>
                  </form>
                </Block>
              </SimpleBar> */}

              {view.add && <div className="toggle-overlay" onClick={toggle}></div>}
            </Content>
      }
    </React.Fragment>
  );
};

export default MenuList;
