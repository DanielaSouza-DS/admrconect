package com.admr.admrconect.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "produtos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(unique = true, nullable = false)
    private String codigo;

    private String descricao;

    @Column(nullable = false)
    private Double precoUnitario;

    @Column(columnDefinition = "int default 0")
    private int quantidade = 0;

    @Column(columnDefinition = "int default 30")
    private int alertaMinimo = 30;

    public boolean isEstoqueBaixo() {
        return quantidade < alertaMinimo;
    }
}
