// import React, { useState} from 'react';
// import {Alert, View, Button} from "react-native";
//
// import {useProduct} from "../ProductProvider";
// import {editProduct} from "../ProductService";
//
// import Form from "../../../components/Form/Form";
// import {ErrorText} from "../../../components/Shared";
//
// export default function EditProduct(props) {
//     const {navigation} = props;
//     const product = navigation.getParam("product");
//
//     //1 - DECLARE VARIABLES
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const {updateProduct} = useProduct();
//
//     const fields = [
//         {name: 'name', label: 'PRODUCT NAME', required: true, value:product.name || ""},
//         [
//             {name: 'retail_price', label: 'RETAIL PRICE', required: true, type:'number', value:product.retail_price.toString()},
//             {name: 'selling_price', label: 'SELLING PRICE', required: true, type:'number', value:product.selling_price.toString()}
//         ],
//         {name: 'description', label: 'DESCRIPTION', required: false, value:product.description || ""}
//     ];
//
//     async function onSubmit(data) {
//         setLoading(true);
//
//         try {
//             let response = await editProduct(product._id, data);
//
//             updateProduct(response.product);
//
//             setLoading(false);
//
//             Alert.alert(
//                 'Product Updated',
//                 response.message,
//                 [{text: 'OK', onPress: () => navigation.goBack()}],
//                 {cancelable: false},
//             );
//         } catch (error) {
//             setError(error.message);
//             setLoading(false)
//         }
//     }
//
//     let formProps = {title: "SAVE", fields, onSubmit, loading, buttonStyle:{backgroundColor:"#5070FE"} };
//     return (
//         <View style={{flex:1, paddingHorizontal: 16}}>
//             <View style={{flex:1}}>
//                 <ErrorText error={error}/>
//                 <Form {...formProps}>
//                 </Form>
//             </View>
//         </View>
//     );
// };
//
// EditProduct.navigationOptions = ({navigation}) => {
//     return {
//         title: `Edit Product`,
//         // headerLeft: (
//         //     <Button
//         //         onPress={() => navigation.goBack()}
//         //         title="Cancel"
//         //         color="#fff"
//         //     />)
//     }
// };