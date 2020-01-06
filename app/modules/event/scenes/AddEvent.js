// import React, { useState} from 'react';
// import {Alert, View, Button} from "react-native";
//
// import * as api from "../ProductService";
//
// import Form from "../../../components/Form/Form";
// import {ErrorText} from "../../../components/Shared";
//
// export default function AddProduct(props) {
//     const {navigation} = props;
//     const {navigate} = navigation;
//
//     //1 - DECLARE VARIABLES
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//
//     const fields = [
//         {name: 'name', label: 'PRODUCT NAME', required: true},
//         [
//             {name: 'retail_price', label: 'RETAIL PRICE', required: true, type:'number'},
//             {name: 'selling_price', label: 'SELLING PRICE', required: true, type:'number'}
//         ],
//         {name: 'description', label: 'DESCRIPTION', required: false}
//     ];
//
//     async function onSubmit(data) {
//         setLoading(true);
//
//         try {
//             let response = await api.addProduct(data);
//             setLoading(false);
//             Alert.alert(
//                 'Product Added',
//                 response.message,
//                 [{text: 'OK', onPress: () => navigation.replace("AddProductImage", {productId:response.product._id})}],
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
// AddProduct.navigationOptions = ({navigation}) => {
//     return {
//         title: `Add a New Product`,
//         headerLeft: (
//             <Button
//                 onPress={() => navigation.goBack()}
//                 title="Cancel"
//                 color="#fff"
//             />)
//     }
// };