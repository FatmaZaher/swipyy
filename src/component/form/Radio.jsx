// import React, { Children } from "react";
// // import { Field, ErrorMessage } from "formik";
// import { Formik, Form, ErrorMessage, FieldArray, Field } from "formik";

// const Radio = ({ props, children }) => {
//   const { name, error, options, value, ...rest } = props;
//   return (
//     <div className="form-control">
//       <Field
//         id={name}
//         name={name}
//         value={value}
//         {...rest}
//         className="form-input"
//       >
//         {options.map((option) => {
//           return (
//             <React.Fragment key={option.key}>
//               <input
//                 type="radio"
//                 id={option.id}
//                 {...field}
//                 value={value}
//                 checked={value}
//               />
//               <label htmlFor={option.id}>{option.name}</label>
//               {children}
//             </React.Fragment>
//           );
//         })}
//       </Field>
//       {error && (
//         <div className="error-mes">
//           <ErrorMessage name={name} />
//         </div>
//       )}
//     </div>
//   );
// };
// export default Radio;
