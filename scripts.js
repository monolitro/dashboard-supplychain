// Funcionalidad adicional para el sitio web
document.addEventListener('DOMContentLoaded', function() {
    // Botón de volver arriba
    const backToTopButton = document.createElement('div');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);
    
    // Mostrar/ocultar botón de volver arriba
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Funcionalidad del botón de volver arriba
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animación para los gráficos
    const chartContainers = document.querySelectorAll('.chart-container');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    chartContainers.forEach(container => {
        container.style.opacity = 0;
        container.style.transform = 'translateY(20px)';
        container.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(container);
    });
    
    // Actualizar datos de los gráficos con datos reales
    updateCharts();
    
    // Añadir interactividad a las pestañas
    const tabLinks = document.querySelectorAll('.nav-link');
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-bs-target');
            
            // Actualizar URL con hash
            if (tabId) {
                history.pushState(null, null, tabId);
            }
            
            // Activar pestaña correspondiente si no está usando Bootstrap
            if (!window.bootstrap) {
                tabLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('show', 'active');
                });
                
                document.querySelector(tabId).classList.add('show', 'active');
            }
        });
    });
    
    // Activar pestaña basada en hash de URL
    if (location.hash) {
        const hash = location.hash;
        const tabLink = document.querySelector(`[data-bs-target="${hash}"]`);
        if (tabLink) {
            tabLink.click();
        }
    }
});

// Función para actualizar los gráficos con datos reales
function updateCharts() {
    // Actualizar gráfico de predicciones con datos más precisos
    if (window.prediccionesChart) {
        const historicalData = [7883425, 10013376, 10104549, 15831083, 26613154, 2856985, null, null, null, null, null, null];
        const sarimaData = [null, null, null, null, null, null, 12500000, 9800000, 11200000, 14500000, 18700000, 25300000];
        const xgboostData = [null, null, null, null, null, null, 11800000, 10200000, 12500000, 15800000, 19500000, 24100000];
        
        prediccionesChart.data.datasets[0].data = historicalData;
        prediccionesChart.data.datasets[1].data = sarimaData;
        prediccionesChart.data.datasets[2].data = xgboostData;
        prediccionesChart.update();
    }
    
    // Actualizar gráfico de inventario con datos reales
    if (window.inventarioChart) {
        const inventarioData = [64.53, 33.95, 1.52]; // Exceso, Óptimo, Insuficiente
        inventarioChart.data.datasets[0].data = inventarioData;
        inventarioChart.update();
    }
    
    // Actualizar gráfico de segmentación con datos reales
    if (window.segmentacionChart) {
        const segmentacionData = [17.54, 29.63, 52.84]; // A, B, C
        segmentacionChart.data.datasets[0].data = segmentacionData;
        segmentacionChart.update();
    }
}

// Función para mostrar detalles de productos al hacer clic en gráficos
function showProductDetails(category) {
    // Simulación de datos de productos por categoría
    const productData = {
        'A': [
            { code: 'P001', name: 'Material de Seguridad Tipo A', stock: 1250, consumption: 980 },
            { code: 'P002', name: 'Equipo Protección Individual', stock: 3500, consumption: 2800 },
            { code: 'P003', name: 'Calzado de Seguridad Premium', stock: 1800, consumption: 1500 }
        ],
        'B': [
            { code: 'P101', name: 'Material de Seguridad Tipo B', stock: 950, consumption: 420 },
            { code: 'P102', name: 'Guantes Industriales', stock: 2200, consumption: 1100 },
            { code: 'P103', name: 'Cascos de Protección', stock: 1500, consumption: 800 }
        ],
        'C': [
            { code: 'P201', name: 'Material de Seguridad Tipo C', stock: 450, consumption: 120 },
            { code: 'P202', name: 'Accesorios de Seguridad', stock: 1800, consumption: 350 },
            { code: 'P203', name: 'Señalización', stock: 3000, consumption: 600 }
        ],
        'excess': [
            { code: 'P301', name: 'Material Excedente Tipo 1', stock: 5000, consumption: 200 },
            { code: 'P302', name: 'Material Excedente Tipo 2', stock: 3800, consumption: 150 },
            { code: 'P303', name: 'Material Excedente Tipo 3', stock: 2500, consumption: 100 }
        ],
        'optimal': [
            { code: 'P401', name: 'Material Óptimo Tipo 1', stock: 1200, consumption: 1000 },
            { code: 'P402', name: 'Material Óptimo Tipo 2', stock: 800, consumption: 700 },
            { code: 'P403', name: 'Material Óptimo Tipo 3', stock: 600, consumption: 500 }
        ],
        'insufficient': [
            { code: 'P501', name: 'Material Insuficiente Tipo 1', stock: 100, consumption: 300 },
            { code: 'P502', name: 'Material Insuficiente Tipo 2', stock: 50, consumption: 200 },
            { code: 'P503', name: 'Material Insuficiente Tipo 3', stock: 80, consumption: 250 }
        ]
    };
    
    // Obtener datos para la categoría seleccionada
    const products = productData[category] || [];
    
    // Crear modal para mostrar detalles
    const modalTitle = category === 'A' ? 'Productos Categoría A' : 
                       category === 'B' ? 'Productos Categoría B' : 
                       category === 'C' ? 'Productos Categoría C' :
                       category === 'excess' ? 'Productos con Exceso de Stock' :
                       category === 'optimal' ? 'Productos con Stock Óptimo' :
                       'Productos con Stock Insuficiente';
    
    let modalContent = `
    <div class="modal fade" id="productModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${modalTitle}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nombre</th>
                                <th>Stock</th>
                                <th>Consumo</th>
                                <th>Ratio</th>
                            </tr>
                        </thead>
                        <tbody>
    `;
    
    products.forEach(product => {
        const ratio = (product.stock / product.consumption).toFixed(2);
        modalContent += `
            <tr>
                <td>${product.code}</td>
                <td>${product.name}</td>
                <td>${product.stock}</td>
                <td>${product.consumption}</td>
                <td>${ratio}</td>
            </tr>
        `;
    });
    
    modalContent += `
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    `;
    
    // Añadir modal al DOM
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalContent;
    document.body.appendChild(modalContainer);
    
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
    
    // Eliminar modal del DOM cuando se cierre
    document.getElementById('productModal').addEventListener('hidden.bs.modal', function() {
        document.body.removeChild(modalContainer);
    });
}
