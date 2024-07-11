import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from './ProductCard';
import { Container, Grid, TextField, Select, MenuItem, Button, Pagination } from '@mui/material';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [rating, setRating] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [availability, setAvailability] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchProducts(category, company);
            setProducts(data);
            setFilteredProducts(data);
        };
        fetchData();
    }, [category, company]);

    const handleFilter = () => {
        let filtered = products;
        if (rating) {
            filtered = filtered.filter(product => product.rating >= rating);
        }
        if (priceRange) {
            filtered = filtered.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);
        }
        if (availability) {
            filtered = filtered.filter(product => product.availability === availability);
        }
        setFilteredProducts(filtered);
    };

    const handleSort = (sortBy) => {
        let sorted = [...filteredProducts];
        if (sortBy === 'price') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'rating') {
            sorted.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'discount') {
            sorted.sort((a, b) => b.discount - a.discount);
        }
        setFilteredProducts(sorted);
    };

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    return (
        <Container>
            <h1>Top Products</h1>
            <div>
                <TextField label="Category" value={category} onChange={e => setCategory(e.target.value)} />
                <TextField label="Company" value={company} onChange={e => setCompany(e.target.value)} />
                <TextField label="Rating" type="number" value={rating} onChange={e => setRating(e.target.value)} />
                <TextField label="Price Range" value={priceRange} onChange={e => setPriceRange(e.target.value)} />
                <Select value={availability} onChange={e => setAvailability(e.target.value)}>
                    <MenuItem value="in stock">In Stock</MenuItem>
                    <MenuItem value="out of stock">Out of Stock</MenuItem>
                </Select>
                <Button onClick={handleFilter}>Filter</Button>
            </div>
            <div>
                <Button onClick={() => handleSort('price')}>Sort by Price</Button>
                <Button onClick={() => handleSort('rating')}>Sort by Rating</Button>
                <Button onClick={() => handleSort('discount')}>Sort by Discount</Button>
            </div>
            <Grid container spacing={3}>
                {filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage).map(product => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
            <Pagination count={Math.ceil(filteredProducts.length / itemsPerPage)} page={page} onChange={handleChangePage} />
        </Container>
    );
};

export default ProductList;
