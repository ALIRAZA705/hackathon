import {Alert, FormGroup, Modal, ModalBody, Spinner} from "reactstrap";
import {
    BlockBetween,
    BlockHeadContent,
    BlockTitle,
    Button,
    Col,
    Icon,
    PreviewCard,
    Row,
    RSelect
} from "../../components/Component";
import {categoryOptions, productData} from "../pre-built/products/ProductData";
import Dropzone from "react-dropzone";
import React, {useEffect, useState} from "react";
import {Stack, Grid, Box, Typography, Divider } from "@mui/material";
import "./AddMenuItemForm.css";
import ProductH from "../../images/product/h.png";
import {useForm} from "react-hook-form";
import {addNewMenuItem} from "../../api/menu/menu";
import {useParams} from "react-router";

const AddMenuItemForm = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [errorVal, setError] = useState("");
    const [variants, setVariants] = useState(0);
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [priceDisable, setPriceDisable] = useState(false);
    const { errors, register, handleSubmit } = useForm();
    const [formData, setFormData] = useState({
        // restId: 111,
        item_name: "",
        img: null,
        sku: "",
        regular_price: 0,
        stock: 0,
        category: "",
        category_type: "",
        fav: false,
        check: false,
    });

    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onCategoryChange = (value) => {
        // let catArr = [];
        // value.forEach((v)=>{
        //     console.log(v)
        //     catArr.push(v.value)
        // })
        // setFormData({ ...formData, category: catArr });
        //  for  non-array
        setFormData({ ...formData, category: value[0].value });
    };

    const onCategoryTypeChange = (value) => {
        // let catTypeArr = [];
        // value.forEach((v)=>{
            // console.log(v)
            // catTypeArr.push(v.value)
        // })
        // setFormData({ ...formData, categoryType: catTypeArr });

    //  for  non-array
        setFormData({ ...formData, categoryType: value[0].value });
    };


    const updateVariants = () => {
        setVariants(variants + 1);
        setPriceDisable(true)
    }

    // handles ondrop function of dropzone
    const handleDropChange = (acceptedFiles) => {
        setFiles(
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )
        );
        setImages(acceptedFiles);
        // extractBase64Images(acceptedFiles);
    };


    // const extractBase64Images = (acceptedFiles) => {
    //     let imgs = []
    //     acceptedFiles.forEach((f)=>{
    //         let reader = new FileReader();
    //         reader.readAsDataURL(f);
    //         reader.onload = function () {
    //             imgs.push(reader.result)
    //             setImages(imgs)
    //         };
    //     })
    // }

    const onFormSubmit = async (form) => {
        setLoading(true);
        let newFormData = form;
        for(let each of Object.keys(newFormData)){
            if(each.startsWith("variant-price-") || each.startsWith("variant-name-")){
                delete form[each];
            }
        }

        const payload = {
            ...newFormData,
            restaurant_id: params.id,
            category: formData.category,
            category_type: formData.categoryType,
            description: formData.description,
            variants: [],
            restaurant_file: images
        };

        const variantsArr = [...Array(variants)];
        variantsArr.map((v,i)=>{
            let variant={};
            variant['variant-name'] = formData['variant-name-'+i];
            variant['variant-price'] = formData['variant-price-'+i];
            payload.variants.push(variant)
        });
        const res = await addNewMenuItem(payload);
        console.log("res 111 :: ", res.request.status, res.data.success)
        if(res.request.status !== 200 && res.data.success) {
            setError(res.response.data.exception)
            setTimeout(()=>{
                setError("")
            }, 20000)
            // setError("Cannot register with these credentials");
            setLoading(false);
        }
        else{
            history.push(`${process.env.PUBLIC_URL}/menu`)
        }
    }


    return(
        <div>
                <div className="p-2">
                    <div className="mt-4">
                        <form noValidate
                              onSubmit={handleSubmit(onFormSubmit)}
                        >
                            <Row className="g-3">
                                <Col size="12">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="product-title">
                                            Item Name / Title
                                        </label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="item_name"
                                                onChange={(e) => onInputChange(e)}
                                                ref={register({
                                                    required: "This field is required",
                                                })}
                                                defaultValue={formData.item_name}
                                            />
                                            {errors.item_name && <span className="invalid">{errors.item_name.message}</span>}
                                        </div>
                                    </div>
                                </Col>
                                <Col size="6">
                                    <FormGroup className="form-group">
                                        <label className="form-label" htmlFor="cf-default-textarea">
                                            Description
                                        </label>
                                        <div className="form-control-wrap">
                                            <textarea
                                              className="form-control form-control-sm"
                                              name='description'
                                              onChange={(e) => onInputChange(e)}
                                              id="textarea"
                                              placeholder="Write item description"
                                          ></textarea>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col size="6">
                                        <label className="form-label" htmlFor="category">
                                            Item Image(s)
                                        </label>
                                        <Col size="12">
                                            <Stack direction="row" sx={{
                                                overflowX: "auto",
                                                flexShrink: "0"
                                            }}>
                                                <Dropzone
                                                    onDrop={(acceptedFiles) => handleDropChange(acceptedFiles)}
                                                >
                                                    {({ getRootProps, getInputProps }) => (
                                                        <section>
                                                            <div
                                                                {...getRootProps()}
                                                                className="dropzone upload-zone small bg-lighter my-2 dz-clickable"
                                                            >
                                                                <input {...getInputProps()} />
                                                                {files.length === 0 && <p>Drag 'n' drop some files here, or click to select files</p>}
                                                                {files.map((file) => (
                                                                    <div
                                                                        key={file.name}
                                                                        className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                                                                    >
                                                                        <Stack direction="row">
                                                                            {/*<div className="dz-image">*/}
                                                                            <img height="100px" src={file.preview} alt="preview" />
                                                                            {/*</div>*/}
                                                                        </Stack>

                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </section>
                                                    )}
                                                </Dropzone>
                                            </Stack>
                                        </Col>

                                </Col>
                                <Col md="6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="regular-price">
                                            Regular Price
                                        </label>
                                        <div className="form-control-wrap">
                                            <input
                                                // disabled={priceDisable}
                                                type="number"
                                                name="regular_price"
                                                onChange={(e) => onInputChange(e)}
                                                ref={ !priceDisable? register({
                                                    required: "This field is required",
                                                }) : register({
                                                    required: false,
                                                }) }
                                                className="form-control"
                                                defaultValue={formData.regular_price}
                                            />
                                            {errors.regular_price && <span className="invalid">{errors.regular_price.message}</span>}
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
                                                name="sale_price"
                                                onChange={(e) => onInputChange(e)}
                                                ref={ !priceDisable? register({
                                                    required: "This field is required",
                                                }) : register({
                                                    required: false,
                                                }) }
                                            />
                                            {errors.sale_price && <span className="invalid">{errors.sale_price.message}</span>}
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
                                                ref={register({
                                                    required: "This field is required",
                                                })}
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
                                                ref={register({
                                                    required: "This field is required",
                                                })}
                                            />
                                            {errors.sku && <span className="invalid">{errors.sku.message}</span>}
                                        </div>
                                    </div>
                                </Col>
                                <Col size="6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="category">
                                            Category
                                        </label>
                                        <div className="form-control-wrap">
                                            <RSelect
                                                isMulti
                                                options={categoryOptions}
                                                defaultValue={formData.category}
                                                onChange={(e) => onCategoryChange(e)}
                                                ref={register({
                                                    required: "This field is required",
                                                })}
                                            />
                                            {errors.category && <span className="invalid">{errors.category.message}</span>}
                                        </div>
                                    </div>
                                </Col>
                                <Col size="6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="category">
                                            Category Type
                                        </label>
                                        <div className="form-control-wrap">
                                            <RSelect
                                                isMulti
                                                options={categoryOptions}
                                                defaultValue={formData.category_type}
                                                onChange={(e) => onCategoryTypeChange(e)}
                                                ref={register({
                                                    required: "This field is required",
                                                })}
                                            />
                                            {errors.category_type && <span className="invalid">{errors.category_type.message}</span>}
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            {/*     add variations  */}
                            <Row className="g-3 variation-block">
                                    <Stack className="vertical-center" direction="row" gap={2}>
                                        <h6>Add Item Variations</h6>
                                        <Button className="btn-round btn-icon" color="primary" size="sm"
                                                onClick={updateVariants}>
                                            <Icon name="plus" />
                                        </Button>
                                    </Stack>
                                    <Divider color="white" width="100%"/>

                                <Col size="12">
                                    {
                                        [...Array(variants)].map((val, idx)=> (
                                             <Col size="10">
                                                 <Stack direction="row" sx={{
                                                     flexWrap: "wrap",
                                                     margin: "1rem 0 1rem 0"
                                                 }}>
                                                     <Col md="6">
                                                         <div className="form-group">
                                                             <div className="form-control-wrap">
                                                                 <input
                                                                     id={'variant-name-'+idx}
                                                                     type="text"
                                                                     placeholder="Variant Name"
                                                                     className="form-control"
                                                                     name={'variant-name-'+idx}
                                                                     onChange={(e) => onInputChange(e)}
                                                                     ref={register({ required: "This is required" })}
                                                                 />
                                                                 {errors['variant-name-'+idx] && <span className="invalid">{errors['variant-name-'+idx].message}</span>}
                                                             </div>
                                                         </div>
                                                     </Col>
                                                     <Col md="6">
                                                         <div className="form-group">
                                                             <div className="form-control-wrap">
                                                                 <input
                                                                     id={'variant-price-'+idx}
                                                                     type="number"
                                                                     placeholder="Variant Price"
                                                                     className="form-control"
                                                                     defaultValue={formData.price}
                                                                     name={'variant-price-'+idx}
                                                                     onChange={(e) => onInputChange(e)}
                                                                     ref={register({ required: "This is required" })}
                                                                 />
                                                                 {errors['variant-price-'+idx] && <span className="invalid">{errors['variant-price-'+idx].message}</span>}
                                                             </div>
                                                         </div>
                                                     </Col>
                                                 </Stack>
                                             </Col>

                                        ))
                                    }
                                </Col>

                                <Col size="12">
                                    <Button color="primary" type="submit">
                                        {/*<Icon className="plus"></Icon>*/}
                                        {loading ? <Spinner size="sm" color="light" /> : "Save"}
                                    </Button>

                                </Col>

                                <Col size="12">
                                    {errorVal && (
                                        <div className="mb-3">
                                            <Alert color="danger" className="alert-icon">
                                                {" "}
                                                <Icon name="alert-circle" /> {errorVal}
                                            </Alert>
                                        </div>
                                    )}
                                </Col>
                            </Row>


                            {/*     add variations  END */}
                        </form>
                    </div>
                </div>
        </div>
    )

}

export default AddMenuItemForm;