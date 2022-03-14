import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector } from "react-redux";

import * as Yup from "yup";
import "image-upload-react/dist/index.css";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import tele from "../../assets/images/tele.png";
// import SwitchButton from "../../component/SwitchButton";
import Editicon from "../../component/icons/Editicon";
import LinkButton from "../../component/form/LinkButton";
import FormikControl from "../../component/form/FormikControl";
import Deleteicon from "../../component/icons/Deleteicon";
import TrashIcon from "../icons/TrashIcon";
import ImageUploading from "react-images-uploading";
import axios from "axios";
import UploadImg from "../UploadImg";
import { useTranslation } from "react-i18next";
import DropMenuImg from "../form/DropMenuImg";
import PlusIcon from "../icons/PlusIcon";
import { Accordion } from "react-bootstrap";
import LockModal from "../LockModal";
import ProBtn from "../ProBtn";

const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  ...draggableStyle,
});
const config = JSON.parse(localStorage.getItem("headers"));
const queryAttr = "data-rbd-drag-handle-draggable-id";

const Link = (props) => {
  // const { t } = useTranslation();
  const { t } = props;

  const [placeholderProps, setPlaceholderProps] = useState({});
  const [items, setItems] = useState([]);
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => state.auth);
  let currentUser = {};
  if (user) {
    currentUser = user.data;
  }
  const settings = {
    slider_status: "1",
    title: "My camere",
    images: [
      {
        id: 87,
        src: "https://swipyy.com/swipy/storage/app/public/Slider/ifoZH6TaZ2AFI0qmEC4edtca59PhB3f2mz2mn7x8.png",
      },
      {
        id: 88,
        src: "https://swipyy.com/swipy/storage/app/public/Slider/QPEmdrsKJk21h5sCKyils1c82tfLEsvHwaW2c3NM.png",
      },
    ],
    description: "12 feb",
    description_status: "0",
    link_text: "Download",
    link_status: "0",
    link_url: "google.com",
    size: "1:1",
    title_color: "black",
    link_color: "white",
    button_color: "gray",
  };
  const all_currencies = [
    "AED",
    "AFN",
    "ALL",
    "AMD",
    "ANG",
    "AOA",
    "ARS",
    "AUD",
    "AWG",
    "AZN",
    "BAM",
    "BBD",
    "BDT",
    "BGN",
    "BHD",
    "BIF",
    "BMD",
    "BND",
    "BOB",
    "BRL",
    "BSD",
    "BTN",
    "BWP",
    "BYR",
    "BZD",
    "CAD",
    "CDF",
    "CHF",
    "CKD",
    "CLP",
    "CNY",
    "COP",
    "CRC",
    "CUP",
    "CVE",
    "CZK",
    "DJF",
    "DKK",
    "DOP",
    "DZD",
    "EGP",
    "ERN",
    "ETB",
    "EUR",
    "FJD",
    "FKP",
    "FOK",
    "GBP",
    "GEL",
    "GGP",
    "GHS",
    "GIP",
    "GMD",
    "GNF",
    "GTQ",
    "GYD",
    "HKD",
    "HNL",
    "HRK",
    "HTG",
    "HUF",
    "IDR",
    "ILS",
    "IMP",
    "INR",
    "IQD",
    "IRR",
    "ISK",
    "JEP",
    "JMD",
    "JOD",
    "JPY",
    "KES",
    "KGS",
    "KHR",
    "KID",
    "KMF",
    "KPW",
    "KRW",
    "KWD",
    "KYD",
    "KZT",
    "LAK",
    "LBP",
    "LKR",
    "LRD",
    "LSL",
    "LYD",
    "MAD",
    "MDL",
    "MGA",
    "MKD",
    "MMK",
    "MNT",
    "MOP",
    "MRO",
    "MUR",
    "MVR",
    "MWK",
    "MXN",
    "MYR",
    "MZN",
    "NAD",
    "NGN",
    "NIO",
    "NOK",
    "NPR",
    "NZD",
    "OMR",
    "PAB",
    "PEN",
    "PGK",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "QAR",
    "RON",
    "RSD",
    "RUB",
    "RWF",
    "SAR",
    "SBD",
    "SCR",
    "SDG",
    "SEK",
    "SGD",
    "SHP",
    "SLL",
    "SOS",
    "SRD",
    "SSP",
    "STD",
    "SYP",
    "SZL",
    "THB",
    "TJS",
    "TMT",
    "TND",
    "TOP",
    "TRY",
    "TTD",
    "TVD",
    "TWD",
    "TZS",
    "UAH",
    "UGX",
    "USD",
    "UYU",
    "UZS",
    "VEF",
    "VND",
    "VUV",
    "WST",
    "XAF",
    "XCD",
    "XOF",
    "XPF",
    "YER",
    "ZAR",
    "ZMW",
    "ZWL",
  ];

  const sortItems = (values) => {
    const ides = values.map((item) => item.id);

    props.onStartRequest(true);
    axios
      .post(
        "https://swipyy.com/api/user/link/sort/update",
        { sort_link: ides },
        config
      )
      .then((res) => {
        getMenus();
      });
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    sortItems(result);
    return result;
  };
  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }
    setPlaceholderProps({});
    await setItems((items) =>
      reorder(items, result.source.index, result.destination.index)
    );
  };
  const handleCloseLockModal = () => {
    setIsLockModalOpen(false);
  };
  const getAllCategories = async () => {
    try {
      await axios
        .get("https://swipyy.com/api/user/menu/category/get", config)
        .then((res) => {
          setCategories(res.data.data);
        });
    } catch (error) {}
  };
  const onDragUpdate = (update) => {
    if (!update.destination) {
      return;
    }
    const draggableId = update.draggableId;
    const destinationIndex = update.destination.index;
    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);
    if (!draggedDOM) {
      return;
    }
    const { clientHeight, clientWidth } = draggedDOM;
    const clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      [...draggedDOM.parentNode.children]
        .slice(0, destinationIndex)
        .reduce((total, curr) => {
          const style = curr.currentStyle || window.getComputedStyle(curr);
          const marginBottom = parseFloat(style.marginBottom);
          return total + curr.clientHeight + marginBottom;
        }, 0);
    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentNode).paddingLeft
      ),
    });
  };

  const initialValues = {
    name: "",
    category_id: 6,
  };

  const onSubmit = (values) => {
    if (checkIsPro(1) === false) return;

    props.onStartRequest(true);
    axios
      .post("https://swipyy.com/api/user/menu", values, config)
      .then((res) => {
        getMenus();
      });
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(t("links.link.add-your-link")),
  });
  const getMenus = () => {
    axios.get("https://swipyy.com/api/user/menu", config).then((res) => {
      props.onFinishRequest(false);

      setItems(res.data.data);
    });
  };
  const menuChange = (menuIndex, property, value) => {
    let oldItems = [...items];
    oldItems[menuIndex][property] = value;
    let newItems = oldItems;
    setItems(newItems);
  };
  const itemChange = (menuIndex, itemIndex, property, value) => {
    console.log({ menuIndex, itemIndex, property, value });

    // console.log(Array.isArray(items) ? "items true" : "items false");

    let oldItems = [...items];
    oldItems[menuIndex]["items"][itemIndex][property] = value;
    let newItems = oldItems;
    console.log(newItems);
    setItems(newItems);
  };

  const apiChange = async (id, values) => {
    props.onStartRequest(true);

    try {
      axios
        .patch("https://swipyy.com/api/user/menu/" + id, values, config)
        .then((res) => {
          getMenus();
        });
    } catch (error) {}
  };
  const apiItemChange = async (id, values) => {
    props.onStartRequest(true);

    try {
      axios
        .post(
          "https://swipyy.com/api/user/menu/item/update/" + id,
          values,
          config
        )
        .then((res) => {
          getMenus();
        });
    } catch (error) {}
  };
  const checkIsPro = (value) => {
    if (value === 1) {
      if (currentUser.is_pro === false) {
        setIsLockModalOpen(true);
        return false;
      }
    }
  };
  const handleMenuStatus = (id, value) => {
    const newValue = value === true ? "1" : "0";
    apiChange(id, { status: newValue });
  };
  const handleMenuCategory = (id, value) => {
    apiChange(id, { category_id: value });
  };
  const handleMenuCurrency = (id, value) => {
    apiChange(id, { currency: value });
  };
  const handleMenuBtnColor = (id, value) => {
    apiChange(id, { button_color: value });
  };
  const handleMenuFontColor = (id, value) => {
    apiChange(id, { font_color: value });
  };
  const handleMenuIsExpand = (id, value) => {
    const newValue = value === true ? "1" : "0";

    apiChange(id, { is_expand: newValue });
  };
  const handleMenuUrl = (id, value) => {
    apiChange(id, { url: value });
  };
  const handleMenuUrlStatus = (id, value) => {
    const newValue = value === true ? "1" : "0";

    apiChange(id, { url_status: newValue });
  };
  const handleMenuUrlText = (id, value) => {
    apiChange(id, { url_text: value });
  };

  const handleItemName = (item, value) => {
    apiItemChange(item.id, { name: value });
  };
  const handleItemPrice = (item, value) => {
    apiItemChange(item.id, { price: value });
  };
  const addItemInMenu = async (id) => {
    props.onStartRequest(true);

    try {
      axios
        .post(
          "https://swipyy.com/api/user/menu/item/store",
          { menu_id: id },
          config
        )
        .then((res) => {
          getMenus();
        });
    } catch (error) {}
  };
  useEffect(() => {
    getAllCategories();
    getMenus();
  }, []);

  const handleEditData = (key, e) => {
    props.onStartRequest(true);

    getMenus();
  };
  const handleChangeSwitch = (id, value) => {
    props.onStartRequest(true);

    const newValue = value === true ? "active" : "inactive";
    axios
      .patch(
        "https://swipyy.com/api/user/link/" + id,
        { status: newValue },
        config
      )
      .then((res) => {
        getMenus();
      });
  };
  return (
    <div className="menu-page">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="form-page">
            <FormikControl
              control="input"
              type="text"
              name="name"
              placeholder={t("links.link.button-placholder")}
              error="true"
            />
            <LinkButton
              type="submit"
              buttontext={t("menu.add-menu-btn")}
              icon="yes"
              disabled={formik.values.name === "" ? true : false}
            />
          </Form>
        )}
      </Formik>

      <div className="your-links pt-4">
        {/* <p className="your-links-header mb-3 mb-m-5">
          Add Header
          <span className="icon">
            <HelpOutlineOutlinedIcon />
          </span>
        </p> */}
        <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {items.length
                  ? items.map((menu, index) => (
                      <Draggable
                        key={menu.id}
                        draggableId={String(menu.id)}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <div className="single-item-menu">
                              <div className="single-item mb-3">
                                <div className="link-and-icon">
                                  <img
                                    src="https://cdn-f.heylink.me/static/media/ic_swap_icon.60319cd6.svg"
                                    alt=""
                                  />
                                  <div className="single-item-switch">
                                    <div className="checkbox">
                                      <input
                                        type="checkbox"
                                        name="show"
                                        checked={
                                          menu.status == "1" ? true : false
                                        }
                                        onChange={(e) =>
                                          handleMenuStatus(
                                            menu.id,
                                            e.target.checked
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="single-item-info">
                                    <p className="name-from-link">
                                      {menu.name}
                                    </p>
                                  </div>
                                </div>
                                <div className="link-action">
                                  <div className="form-group-category">
                                    <label htmlFor="">{t("menu.category")}</label>
                                    <select
                                      name=""
                                      id=""
                                      value={menu.category_id}
                                      onChange={(e) =>
                                        handleMenuCategory(
                                          menu.id,
                                          e.target.value
                                        )
                                      }
                                    >
                                      <option selected>Select Category</option>
                                      {categories.map((category, index) => (
                                        <option value={category.id} key={index}>
                                          {category.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <Editicon
                                    item={menu}
                                    config={config}
                                    onSaveData={() => handleEditData()}
                                    api="user/menu"
                                    t={t}
                                  />
                                  <Deleteicon
                                    item={menu}
                                    config={config}
                                    onSaveData={() => handleEditData()}
                                    api="user/menu"
                                    t={t}
                                  />
                                </div>
                              </div>
                              <div className="single-item-menu-body">
                                <div className="list-menu-items">
                                  <h2>{t("menu.items-prices")}</h2>
                                  {menu.items.map((item, item_index) => (
                                    <div
                                      key={item_index}
                                      className="list-menu-item"
                                    >
                                      <div className="list-menu-item-inputs">
                                        <div className="list-menu-item-inputs-top">
                                          <div className="form-group-category list-menu-item-inputs-item-name">
                                            <label htmlFor="">{t("menu.item")}</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              value={item.name}
                                              onChange={(e) =>
                                                itemChange(
                                                  index,
                                                  item_index,
                                                  "name",
                                                  e.target.value
                                                )
                                              }
                                              onBlur={(e) =>
                                                handleItemName(
                                                  item,
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>
                                          <div className="form-group-category list-menu-item-inputs-item-price">
                                            <label htmlFor="">{t("menu.price")}</label>
                                            <input
                                              type="text"
                                              className="form-control "
                                              value={item.price}
                                              onChange={(e) =>
                                                itemChange(
                                                  index,
                                                  item_index,
                                                  "price",
                                                  e.target.value
                                                )
                                              }
                                              onBlur={(e) =>
                                                handleItemPrice(
                                                  item,
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>
                                        </div>
                                        <div className="drop-img">
                                          <DropMenuImg
                                            item={item}
                                            config={config}
                                            uploadType="link"
                                            onSaveData={() => handleEditData()}
                                            t={t}
                                          />
                                        </div>
                                      </div>
                                      <div className="list-menu-item-delete">
                                        <div className="link-action">
                                          <Deleteicon
                                            item={item}
                                            config={config}
                                            onSaveData={() => handleEditData()}
                                            api="user/menu/item/delete"
                                            t={t}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  ))}

                                  <button
                                    className="add-more-item btn"
                                    onClick={() => addItemInMenu(menu.id)}
                                  >
                                    <PlusIcon />
                                    <span>{t("menu.add-item")}</span>
                                  </button>
                                </div>
                                <Accordion defaultActiveKey="0">
                                  <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                    {t("menu.more-details")}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      <div className="form-group">
                                        <div className="row">
                                          <div className="col-3">
                                            <h5 htmlFor="">{t("menu.currency")}</h5>
                                          </div>
                                          <div className="col-9">
                                            <div className="form-group-category">
                                              <label htmlFor="">
                                              {t("menu.choose-currency")}
                                              </label>
                                              <select
                                                name=""
                                                id=""
                                                value={menu.category_id}
                                                onChange={(e) =>
                                                  handleMenuCurrency(
                                                    menu.id,
                                                    e.target.value
                                                  )
                                                }
                                                style={{ width: "120px" }}
                                              >
                                                {all_currencies.map(
                                                  (currency, index) => (
                                                    <option
                                                      value={currency}
                                                      key={index}
                                                    >
                                                      {currency}
                                                    </option>
                                                  )
                                                )}
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="social-icon">
                                        <div className="high-title with-border">
                                          <p>
                                          {t("menu.expand-title")}
                                            <ProBtn />
                                          </p>

                                          <div className="single-item-switch">
                                            <div className="checkbox">
                                              <input
                                                type="checkbox"
                                                name="show"
                                                checked={
                                                  menu.is_expand == "1"
                                                    ? true
                                                    : false
                                                }
                                                onChange={(e) =>
                                                  handleMenuIsExpand(
                                                    menu.id,
                                                    e.target.checked
                                                  )
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="social-icon">
                                        <div className="high-title with-border">
                                          <p>
                                          {t("menu.add-link-title")}
                                            <ProBtn />
                                          </p>

                                          <div className="single-item-switch">
                                            <div className="checkbox">
                                              <input
                                                type="checkbox"
                                                name="show"
                                                checked={
                                                  menu.url_status == "1"
                                                    ? true
                                                    : false
                                                }
                                                onChange={(e) =>
                                                  handleMenuUrlStatus(
                                                    menu.id,
                                                    e.target.checked
                                                  )
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {menu.url_status == 1 ? (
                                        <div className="list-menu-item-inputs-top">
                                          <div className="form-group-category w-50">
                                            <label htmlFor="">{t("menu.link-text")}</label>
                                            <input
                                              type="text"
                                              className="form-control "
                                              onChange={(e) =>
                                                menuChange(
                                                  index,
                                                  "url_text",
                                                  e.target.value
                                                )
                                              }
                                              onBlur={(e) =>
                                                handleMenuUrlText(
                                                  menu.id,
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>
                                          <div className="form-group-category w-50">
                                            <label htmlFor="">{t("menu.link-url")}</label>
                                            <input
                                              type="text"
                                              className="form-control "
                                              onChange={(e) =>
                                                menuChange(
                                                  index,
                                                  "url",
                                                  e.target.value
                                                )
                                              }
                                              onBlur={(e) =>
                                                handleMenuUrl(
                                                  menu.id,
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>
                                        </div>
                                      ) : null}

                                      <div className="button-color my-3">
                                        <div className="input-color-box-parent">
                                          <h3>{t("menu.button-color")}</h3>
                                          <div
                                            className="input-color-box"
                                             style={{ background: menu.button_color }}
                                          >
                                            <input
                                              type="color"
                                              id="changebtn_button_color"
                                              value={menu.button_color}
                                              onChange={(e) =>
                                                menuChange(
                                                  index,
                                                  "button_color",
                                                  e.target.value
                                                )
                                              }
                                              onBlur={(e) =>
                                                handleMenuBtnColor(
                                                  menu.id,
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <span>{menu.button_color}</span>
                                            <label htmlFor="changebtn_font_color"></label>
                                          </div>
                                        </div>
                                        <div className="input-color-box-parent">
                                          <h3>{t("menu.font-color")}</h3>

                                          <div
                                            className="input-color-box"
                                            style={{ background: menu.font_color }}
                                          >
                                            <input
                                              type="color"
                                              id="changetitile_descreption_color"
                                              value={menu.font_color}

                                              onChange={(e) =>
                                                menuChange(
                                                  index,
                                                  "font_color",
                                                  e.target.value
                                                )
                                              }
                                              onBlur={(e) =>
                                                handleMenuFontColor(
                                                  menu.id,
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <span>{menu.font_color}</span>
                                            <label htmlFor="changetitile_descreption_color"></label>
                                          </div>
                                        </div>
                                      </div>
                                    </Accordion.Body>
                                  </Accordion.Item>
                                </Accordion>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                  : null}

                {provided.placeholder}
                <div
                  style={{
                    position: "absolute",
                    top: placeholderProps.clientY,
                    left: placeholderProps.clientX,
                    height: placeholderProps.clientHeight,
                    width: placeholderProps.clientWidth,
                  }}
                />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <LockModal
        modalIsOpen={isLockModalOpen}
        onCloseLockModal={() => handleCloseLockModal()}
      />
    </div>
  );
};
export default Link;
