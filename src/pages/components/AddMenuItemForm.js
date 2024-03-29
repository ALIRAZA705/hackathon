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
import {categoryOptions, categoryTypeOptions, productData} from "../pre-built/products/ProductData";
import Dropzone from "react-dropzone";
import React, {useEffect, useState} from "react";
import {Stack, Grid, Box, Typography, Divider } from "@mui/material";
import "./AddMenuItemForm.css";
import ProductH from "../../images/product/h.png";
import {useForm} from "react-hook-form";
import {addNewDomain, addNewMenuItem, editMenuItem} from "../../api/menu/menu";
import {useParams} from "react-router";
import {UploadButton} from "../../components/UploadButton";
import {variantTypes, menuTypes, addonTypes} from "./AddMenuItemDropDowns";
import { getDomainName } from "../../api/misc/misc";

const AddMenuItemForm = (props) => {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [errorVal, setError] = useState("");
    const [variants, setVariants] = useState(0);
    const [addons, setAddons] = useState(0);
    const [files, setFiles] = useState([]);
    const [categoryOptions2, setCategoryOptions2] = useState([]);

    const [images, setImages] = useState([]);
    const [priceDisable, setPriceDisable] = useState(false);
    const { errors, register, handleSubmit } = useForm();
    const [formData, setFormData] = useState(props.editFormData? props.editFormData : {
        // restId: 111,
        name: "",
        img: null,
        sku: "",
        regular_price: 0,
        description: "",
        sale_price: null,
        stock: 0,
        parentId: "",
        category_type: "",
        required_variant_type: null,
        required_menue_type: null,
        fav: false,
        check: false,
        id: null,
        name: "",
        parentId: "",
        parentDomain: ""
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
        // setFormData({ ...formData, parentId: catArr });
        //  for  non-array
        console.log("valuevalue",value)
        setFormData({ ...formData, parentId: value });
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

    const deleteAllVariants = () => {
        setVariants(0);
        setFormData({ ...formData, required_menue_type: null, required_variant_type: null });
        // setFormData({ ...formData, });
        setPriceDisable(false)
    }

    const updateAddons = () => {
        setAddons(addons + 1);
        // setPriceDisable(true)
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



    const onFormSubmit = async (form) => {
        console.log("form data", form)
        // setLoading(true);
        let newFormData = form;
        // for(let each of Object.keys(newFormData)){
        //     if(each.startsWith("variant-price-") || each.startsWith("variant-name-") || each.startsWith("variant-picture-")
        //         || each.startsWith("addon-price-") || each.startsWith("addon-name-") || each.startsWith("addon-picture-")){
        //         delete form[each];
        //     }
        // }

        const payload = {
            ...newFormData,
            id: formData.id,
            parentId: formData.parentId?.value,
            description: formData.description,
            name: formData.name,
        };

        // const variantsArr = [...Array(variants)];
        // variantsArr.map((v,i)=>{
        //     // let variant={};
        //     // variant['variant-name'] = formData['variant-name-'+i];
        //     // variant['variant-price'] = formData['variant-price-'+i];
        //     // variant['variant-picture'] = formData['variant-picture-'+i];
        //     // variant['variant-picture'] = URL.createObjectURL(formData['variant-picture-'+i]);
        //     // payload.variants.push(variant)
        //     payload.required_variant_name.push(formData['variant-name-'+i])
        //     payload.required_variant_price.push(formData['variant-price-'+i])
        //     payload.required_variant_image.push(formData['variant-picture-'+i])
        // });

        // const addonsArr = [...Array(addons)];
        // addonsArr.map((v,i)=>{
        //     payload.optional_variant_name.push(formData['addon-name-'+i])
        //     payload.optional_variant_price.push(formData['addon-price-'+i])
        //     payload.optional_variant_image.push(formData['addon-picture-'+i])
        // });
        console.log("payload ::::::: ", payload)

        let res;
        // if(props.edit){
        //    res = await editMenuItem(payload);
        // }
        // else{
        //     res = await addNewMenuItem(payload);
        // }

        res = await addNewDomain(payload);

        console.log("asdasdas",res,res?.status !== 200,res?.response?.message,res?.response?.data?.message?.message)
        if(res?.status !== 200) {
            const err= res?.response?.data?.message?.message
            setError(err)
            setTimeout(()=>{
                setError("")
            }, 3000)
            setLoading(false);
        }
        else{
                window.location.href = '/admin/domains';
        }
    }

    const transformDomaindata = (domainsdata) =>{

    }

    const getDomains = async () => {
        let data = await getDomainName();

        setCategoryOptions2(data?.data)
    };

    useEffect(()=>{
        getDomains();
    },[])


    return(
        <div>
                <div className="p-2">
                    <div className="mt-4">
                        <form noValidate
                              onSubmit={handleSubmit(onFormSubmit)}
                        >
                            <Row className="g-3">
                                <Col size="6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="product-title">
                                            ID
                                        </label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="id"
                                                onChange={(e) => onInputChange(e)}
                                                ref={register({
                                                    required: "This field is required",
                                                })}
                                                defaultValue={formData.id}
                                            />
                                            {/* {errors.name && <span className="invalid">{errors.name.message}</span>} */}
                                        </div>
                                    </div>
                                </Col>
                                <Col size="6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="product-title">
                                            Name
                                        </label>
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                onChange={(e) => onInputChange(e)}
                                                ref={register({
                                                    required: "This field is required",
                                                })}
                                                defaultValue={formData.name}
                                            />
                                            {/* {errors.name && <span className="invalid">{errors.name.message}</span>} */}
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
                                              defaultValue={formData.description}
                                              onChange={(e) => onInputChange(e)}
                                              id="textarea"
                                              placeholder="Write item description"
                                          ></textarea>
                                        </div>
                                    </FormGroup>
                                </Col>
                                
                                <Col size="6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="parentId">
                                        Parent Domain
                                        </label>
                                        <div className="form-control-wrap">
                                            <RSelect
                                                options={categoryOptions2}
                                                defaultValue={formData.parentId}
                                                onChange={(e) => onCategoryChange(e)}
                                                ref={register({
                                                    required: "This field is required",
                                                })}
                                            />
                                            {errors.parentId && <span className="invalid">{errors.parentId.message}</span>}
                                        </div>
                                    </div>
                                </Col>
                                {/* <Col size="6">
                                   <div className="form-group">
                                       <label className="form-label" htmlFor="parentId">
                                           Category Type
                                       </label>
                                       <div className="form-control-wrap">
                                           <RSelect
                                                isMulti
                                                options={categoryTypeOptions}
                                                defaultValue={formData.category_type}
                                                onChange={(e) => onCategoryTypeChange(e)}
                                                ref={register({
                                                    required: "This field is required",
                                                })}
                                            />
                                            {errors.category_type && <span className="invalid">{errors.category_type.message}</span>}
                                        </div>
                                    </div>
                                </Col> */}
                            </Row>

                            {/*     add variations & addons */}
                            {/*  */}


                            {/*     add variations  END */}


                            {/*     add optional Addons  */}
                            {/*<Row className="g-3 variation-block">*/}
                            {/*    <Stack className="vertical-center" direction="row" gap={2}>*/}
                            {/*        <h6>Addons (Optional)</h6>*/}
                            {/*        <Button className="btn-round btn-icon" color="primary" size="sm"*/}
                            {/*                onClick={updateAddons}>*/}
                            {/*            <Icon name="plus" />*/}
                            {/*        </Button>*/}
                            {/*    </Stack>*/}
                            {/*    <Divider color="white" width="100%"/>*/}

                            {/*    <Col size="12">*/}
                            {/*        {*/}
                            {/*            [...Array(addons)].map((val, idx)=> (*/}
                            {/*                <Col size="10">*/}
                            {/*                    <Stack direction="row" sx={{*/}
                            {/*                        flexWrap: "wrap",*/}
                            {/*                        margin: "1rem 0 1rem 0"*/}
                            {/*                    }}>*/}
                            {/*                        <Col md="5">*/}
                            {/*                            <div className="form-group">*/}
                            {/*                                <div className="form-control-wrap">*/}
                            {/*                                    <input*/}
                            {/*                                        id={'addon-name-'+idx}*/}
                            {/*                                        type="text"*/}
                            {/*                                        placeholder="Addon Name"*/}
                            {/*                                        className="form-control"*/}
                            {/*                                        name={'addon-name-'+idx}*/}
                            {/*                                        onChange={(e) => onInputChange(e)}*/}
                            {/*                                        ref={register({ required: "This is required" })}*/}
                            {/*                                    />*/}
                            {/*                                    {errors['addon-name-'+idx] && <span className="invalid">{errors['addon-name-'+idx].message}</span>}*/}
                            {/*                                </div>*/}
                            {/*                            </div>*/}
                            {/*                        </Col>*/}
                            {/*                        <Col md="4">*/}
                            {/*                            <div className="form-group">*/}
                            {/*                                <div className="form-control-wrap">*/}
                            {/*                                    <input*/}
                            {/*                                        id={'addon-price-'+idx}*/}
                            {/*                                        type="number"*/}
                            {/*                                        placeholder="Addon Price"*/}
                            {/*                                        className="form-control"*/}
                            {/*                                        defaultValue={formData.price}*/}
                            {/*                                        name={'addon-price-'+idx}*/}
                            {/*                                        onChange={(e) => onInputChange(e)}*/}
                            {/*                                        ref={register({ required: "This is required" })}*/}
                            {/*                                    />*/}
                            {/*                                    {errors['addon-price-'+idx] && <span className="invalid">{errors['addon-price-'+idx].message}</span>}*/}
                            {/*                                </div>*/}
                            {/*                            </div>*/}
                            {/*                        </Col>*/}
                            {/*                        <Col md="2">*/}
                            {/*                            <UploadButton*/}
                            {/*                                setUploadFile={(f)=>{*/}
                            {/*                                    // const a= {`variant-price-${idx}`: f}*/}
                            {/*                                    setFormData({ ...formData, [`addon-picture-${idx}`]: f });*/}
                            {/*                                }}*/}
                            {/*                            />*/}
                            {/*                        </Col>*/}
                            {/*                        <Col md="1">*/}
                            {/*                            <Box>*/}
                            {/*                                <img*/}
                            {/*                                    style={{*/}
                            {/*                                        padding: "1px",*/}
                            {/*                                        border: "1px dotted grey"*/}
                            {/*                                    }}*/}
                            {/*                                    width="30px"*/}
                            {/*                                    height="30px"*/}
                            {/*                                    src={formData[`addon-picture-${idx}`]? URL.createObjectURL(formData[`addon-picture-${idx}`]) : null}*/}
                            {/*                                />*/}
                            {/*                            </Box>*/}
                            {/*                        </Col>*/}
                            {/*                    </Stack>*/}
                            {/*                </Col>*/}

                            {/*            ))*/}
                            {/*        }*/}
                            {/*    </Col>*/}

                               <Col size="12">
                                   {errorVal && (
                                   <div className="mb-3">
                                          <Alert color="danger" className="alert-icon">
                                          {errorVal}
                                           <Icon name="alert-circle" /> {errorVal}
                                           </Alert>
                                       </div>
                                    )}
                                </Col>

                            {/*    <Col size="12">*/}
                            

                            {/*    </Col>*/}

                            {/*</Row>*/}


                            {/*     add optional Addons  END */}

                            <Row>
                                <Col size="10">
                                </Col>
                                <Col size="1">
                                <Button color="primary" type="submit">
                           <Icon className="plus"></Icon>
                             {loading ? <Spinner size="sm" color="light" /> : "Save"}
                                 </Button>
                                </Col>
                            </Row>

                        </form>
                    </div>
                </div>
        </div>
    )

}

export default AddMenuItemForm;
