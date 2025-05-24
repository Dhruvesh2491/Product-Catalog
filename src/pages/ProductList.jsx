import { useEffect, useState } from 'react';
import { getAllProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import Error from '../components/Error';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllProducts()
            .then(data => {
                setProducts(data);
                setFilteredProducts(data);
                const allCategories = ['All', ...new Set(data.map(p => p.category))];
                setCategories(allCategories);
            })
            .catch(err => {
                setError('Failed to fetch products.');
            });
    }, []);

    useEffect(() => {
        let filtered = products;

        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory, products]);

    if (error) return <Error message={error} />;

    return (
        <Container className="py-4 ms-2" style={{ height: "100%" }}>
            <h1 className="mb-4 text-center">Product Catalog</h1>
            
            <Row
                className="mb-4 px-3"
                style={{
                    marginLeft:"1px",
                    display: 'flex',
                    flexDirection: window.innerWidth < 780 ? 'column' : 'row',
                    gap: '1rem',
                }}
            >
                <Col md={6} className="p-0">
                    <InputGroup>
                        <InputGroup.Text>🔍</InputGroup.Text>
                        <Form.Control
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col md={4} className="p-0">
                    <Form.Select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>


            <Row xs={1} sm={2} md={4} className="g-5 px-3">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <Col key={product.id}>
                            <ProductCard product={product} />
                        </Col>
                    ))
                ) : (
                    <p className="text-center">No products found.</p>
                )}
            </Row>
        </Container>
    );
};

export default ProductList;
