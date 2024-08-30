import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Details = ({ route }) => {
    const { id } = route.params;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        fetchProductDetails();
    }, []);

    const fetchProductDetails = () => {
        const URL = `https://dummyjson.com/products/${id}`;
        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product details:", error);
                setLoading(false);
            });
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.loaderContainer}>
                <Text>Product not found.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: product.thumbnail }} style={styles.image} />
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Button title="Back" onPress={() => navigation.goBack()} color="#f4511e" />
        </ScrollView>
    );
};

export default Details;

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    container: {
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 125,
        marginBottom: 20,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 15,
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#f4511e',
        marginBottom: 20,
    },
});
