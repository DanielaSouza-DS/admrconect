package com.admr.admrconect.model;

import com.admr.admrconect.enums.OrigemVenda;
import com.admr.admrconect.enums.StatusPedido;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pedidos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario vendedor;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusPedido status = StatusPedido.EM_ANDAMENTO;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrigemVenda origemVenda;

    @CreationTimestamp
    private LocalDateTime dataPedido;

    private LocalDateTime dataEnvio;

    private LocalDateTime dataEntrega;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    private List<ItemPedido> itens = new ArrayList<>();

    public void avancarStatus() {
        switch (this.status) {
            case EM_ANDAMENTO -> this.status = StatusPedido.SEPARADO;
            case SEPARADO     -> {
                this.status = StatusPedido.ENTREGUE;
                this.dataEntrega = LocalDateTime.now();
            }
            default -> System.out.println("Pedido ja entregue.");
        }
    }

    public double calcularTotal() {
        return itens.stream()
                .mapToDouble(ItemPedido::getSubtotal)
                .sum();
    }
}
