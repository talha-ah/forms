import * as actionTypes from "../actions/actionTypes";
const currentYear = new Date().getFullYear();

const initialState = {
  page: 0,
  form1: {
    productName: "",
    productLabel: "",
    productCategory: "weight",
    addressCheckbox: false,
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  },
  form2: {
    field1: "",
    field2: "",
    select1: "option1",
    select2: "option1",
    productFeatures: [],
  },
  form3: {
    groups: [
      {
        name: "",
        description: "",
        features: [],
        children: [
          {
            quantity: "",
            price: "",
          },
        ],
      },
    ],
  },
  form4: {
    description: "",
  },
  form5: {
    dates: [
      {
        id: 0,
        name: "Google I/O",
        location: "San Francisco, CA",
        startDate: new Date(currentYear, 4, 28),
        endDate: new Date(currentYear, 4, 29),
      },
      {
        id: 1,
        name: "Microsoft Convergence",
        location: "New Orleans, LA",
        startDate: new Date(currentYear, 2, 16),
        endDate: new Date(currentYear, 2, 19),
      },
      {
        id: 2,
        name: "Microsoft Build Developer Conference",
        location: "San Francisco, CA",
        startDate: new Date(currentYear, 3, 29),
        endDate: new Date(currentYear, 4, 1),
      },
      {
        id: 3,
        name: "Apple Special Event",
        location: "San Francisco, CA",
        startDate: new Date(currentYear, 8, 1),
        endDate: new Date(currentYear, 8, 1),
      },
      {
        id: 4,
        name: "Apple Keynote",
        location: "San Francisco, CA",
        startDate: new Date(currentYear, 8, 9),
        endDate: new Date(currentYear, 8, 9),
      },
      {
        id: 5,
        name: "Chrome Developer Summit",
        location: "Mountain View, CA",
        startDate: new Date(currentYear, 10, 17),
        endDate: new Date(currentYear, 10, 18),
      },
    ],
  },
  form6: {
    files: [],
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PAGE:
      return {
        ...state,
        page: action.data,
      };
    case actionTypes.SET_FORM_1:
      return {
        ...state,
        form1: action.data,
      };
    case actionTypes.SET_FORM_2:
      return {
        ...state,
        form2: action.data,
      };
    case actionTypes.SET_FORM_3:
      return {
        ...state,
        form3: action.data,
      };
    case actionTypes.SET_FORM_4:
      return {
        ...state,
        form4: action.data,
      };
    case actionTypes.SET_FORM_5:
      return {
        ...state,
        form5: action.data,
      };
    case actionTypes.SET_FORM_6:
      return {
        ...state,
        form6: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
