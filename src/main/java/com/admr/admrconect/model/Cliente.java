package com.admr.admrconect.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "clientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario vendedor;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String telefone;

    private String empresa;

    private int freqRecompraDias;

    private String classificacao;

    @CreationTimestamp
    private LocalDateTime dataCadastro;
}
