package com.admr.admrconect.model;

import com.admr.admrconect.enums.OrigemVenda;
import com.admr.admrconect.enums.ResultadoLigacao;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "ligacoes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ligacao {

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
    private ResultadoLigacao resultado;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrigemVenda origem;

    @Column(columnDefinition = "TEXT")
    private String observacao;

    @CreationTimestamp
    private LocalDateTime dataLigacao;
}
