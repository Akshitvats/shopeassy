import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css';

const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

function AdminDashboard() {
  const { user, token, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  const [products, setProducts] = useState([]);
  const [productsError, setProductsError] = useState('');
  const [productSearch, setProductSearch] = useState('');

  const emptyProduct = {
    _id: null,
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    inStock: true
  };

  const [productForm, setProductForm] = useState(emptyProduct);
  const [productMessage, setProductMessage] = useState('');
  const [productError, setProductError] = useState('');

  useEffect(() => {
    if (loading) return;
    if (!user || !isAdmin) {
      navigate('/');
      return;
    }
    fetchOrders();
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAdmin, loading]);

  const fetchOrders = async () => {
    setOrdersLoading(true);
    setOrdersError('');
    try {
      const url = orderSearch 
        ? `/api/orders?search=${encodeURIComponent(orderSearch)}`
        : '/api/orders';
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) {
        setOrdersError('Failed to load orders');
        setOrdersLoading(false);
        return;
      }
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setOrdersError('Failed to load orders');
    } finally {
      setOrdersLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const url = productSearch
        ? `/api/products?search=${encodeURIComponent(productSearch)}`
        : '/api/products';
      const res = await fetch(url);
      if (!res.ok) {
        setProductsError('Failed to load products');
        return;
      }
      const data = await res.json();
      // Backend now returns { products: [], ... } for pagination
      setProducts(data.products || data);
    } catch (err) {
      setProductsError('Failed to load products');
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (!res.ok) {
        alert('Failed to update status');
        return;
      }
      const updated = await res.json();
      setOrders((prev) => prev.map((o) => (o._id === orderId ? updated : o)));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const startEditProduct = (p) => {
    setProductForm({
      _id: p._id,
      name: p.name,
      description: p.description,
      price: p.price,
      image: p.image,
      category: p.category,
      inStock: p.inStock
    });
    setProductMessage('Editing product');
    setProductError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetProductForm = () => {
    setProductForm(emptyProduct);
    setProductMessage('');
    setProductError('');
  };

  const handleProductSubmit = async () => {
    setProductMessage('');
    setProductError('');

    if (!productForm.name || !productForm.price || !productForm.image || !productForm.category) {
      setProductError('Name, price, image, and category are required');
      return;
    }

    const payload = {
      name: productForm.name,
      description: productForm.description,
      price: Number(productForm.price),
      image: productForm.image,
      category: productForm.category,
      inStock: productForm.inStock
    };

    const isEdit = Boolean(productForm._id);
    const url = isEdit ? `/api/products/${productForm._id}` : '/api/products';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json();
        setProductError(err.message || 'Failed to save product');
        return;
      }

      setProductMessage(isEdit ? 'Product updated' : 'Product created');
      resetProductForm();
      fetchProducts();
    } catch (err) {
      setProductError('Failed to save product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) {
        const err = await res.json();
        setProductError(err.message || 'Delete failed');
        return;
      }
      setProductMessage('Product deleted');
      fetchProducts();
      if (productForm._id === id) resetProductForm();
    } catch (err) {
      setProductError('Delete failed');
    }
  };

  if (loading) return null;
  if (!user || !isAdmin) return null;

  return (
    <div className="container admin-page">
      <div className="admin-header">
        <div>
          <p className="eyebrow">Admin Dashboard</p>
          <h1>Orders & Product Control</h1>
          <p className="sub">Manage orders, confirm shipping, and create orders on behalf of customers.</p>
        </div>
      </div>

      <div className="admin-grid">
        <section className="card">
          <div className="card-header">
            <h2>All Orders</h2>
            <button className="btn btn-primary" onClick={fetchOrders}>Refresh</button>
          </div>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by customer name or email..."
              value={orderSearch}
              onChange={(e) => setOrderSearch(e.target.value)}
            />
            <button onClick={fetchOrders} className="btn btn-secondary">Search</button>
            {orderSearch && (
              <button onClick={() => { setOrderSearch(''); fetchOrders(); }} className="btn btn-secondary">
                Clear
              </button>
            )}
          </div>
          {ordersLoading && <p>Loading orders...</p>}
          {ordersError && <p className="error-message">{ordersError}</p>}
          {!ordersLoading && !ordersError && (
            <div className="orders-table">
              <div className="orders-row head">
                <span>ID</span>
                <span>Customer</span>
                <span>Total</span>
                <span>Status</span>
                <span>Date</span>
              </div>
              {orders.map((order) => (
                <div key={order._id} className="orders-row">
                  <span className="mono">#{order._id.slice(-6)}</span>
                  <span>{order.user?.name || 'N/A'}<br /><small>{order.user?.email || ''}</small></span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                  <span>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </span>
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="card">
          <div className="card-header">
            <h2>Manage Products</h2>
            <button className="btn btn-primary" onClick={resetProductForm}>New Product</button>
          </div>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by product name, category, or description..."
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
            />
            <button onClick={fetchProducts} className="btn btn-secondary">Search</button>
            {productSearch && (
              <button onClick={() => { setProductSearch(''); fetchProducts(); }} className="btn btn-secondary">
                Clear
              </button>
            )}
          </div>
          {productsError && <p className="error-message">{productsError}</p>}
          {productError && <p className="error-message">{productError}</p>}
          {productMessage && <p className="success-message">{productMessage}</p>}

          <div className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={productForm.name}
                onChange={(e) => setProductForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                min="0"
                value={productForm.price}
                onChange={(e) => setProductForm((f) => ({ ...f, price: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                value={productForm.category}
                onChange={(e) => setProductForm((f) => ({ ...f, category: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                value={productForm.image}
                onChange={(e) => setProductForm((f) => ({ ...f, image: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                rows={3}
                value={productForm.description}
                onChange={(e) => setProductForm((f) => ({ ...f, description: e.target.value }))}
              />
            </div>
            <div className="form-group checkbox-row">
              <label>In Stock</label>
              <input
                type="checkbox"
                checked={productForm.inStock}
                onChange={(e) => setProductForm((f) => ({ ...f, inStock: e.target.checked }))}
              />
            </div>
          </div>

          <button className="btn btn-primary" onClick={handleProductSubmit}>
            {productForm._id ? 'Update Product' : 'Create Product'}
          </button>
        </section>
      </div>

      <section className="card">
        <div className="card-header">
          <h2>All Products</h2>
          <button className="btn btn-primary" onClick={fetchProducts}>Refresh</button>
        </div>
        {products.length === 0 ? (
          <p>No products yet</p>
        ) : (
          <div className="product-grid">
            {products.map((p) => (
              <div key={p._id} className="product-card-admin">
                <div className="thumb">
                  <img src={p.image} alt={p.name} />
                </div>
                <div className="product-info">
                  <h3>{p.name}</h3>
                  <p className="muted">{p.category}</p>
                  <p className="price">${p.price.toFixed(2)}</p>
                  <p className="muted small">{p.description?.substring(0, 60)}{p.description?.length > 60 ? '...' : ''}</p>
                  <p className="muted small" style={{ fontWeight: 600, marginTop: '8px' }}>
                    {p.inStock ? '✓ In stock' : '✗ Out of stock'}
                  </p>
                </div>
                <div className="actions">
                  <button className="btn btn-primary" onClick={() => startEditProduct(p)}>Edit</button>
                  <button className="btn danger" onClick={() => handleDeleteProduct(p._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;
