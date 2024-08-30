import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = () => {
        const URL = "https://dummyjson.com/products";
        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
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
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    if (!products) {
        return (
            <View style={styles.loaderContainer}>
                <Text style={styles.errorText}>Product not found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={products}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Details', { id: item.id })} style={styles.productContainer}>
                        <Image source={{ uri: item.thumbnail }} style={styles.image} />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text numberOfLines={3} ellipsizeMode='tail' style={styles.description}>
                                {item.description}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default Products;

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4b6584',
    },
    container: {
        flex: 1,
        backgroundColor: '#f8f9fd',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    productContainer: {
        flexDirection: 'row',
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 15,
        resizeMode: 'cover',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
        color: '#555',
    },
    errorText: {
        color: '#fff',
        fontSize: 18,
    },
});
