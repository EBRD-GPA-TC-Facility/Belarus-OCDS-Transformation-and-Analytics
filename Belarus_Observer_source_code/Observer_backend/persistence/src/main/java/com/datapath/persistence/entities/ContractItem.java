package com.datapath.persistence.entities;

import lombok.*;

import javax.persistence.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "contract_item",
        indexes = {
                @Index(columnList = "classification_id", name = "contract_item_classification_id_idx"),
                @Index(columnList = "contract_id", name = "contract_item_contract_id_idx"),
                @Index(columnList = "position_type", name = "contract_item_position_type_idx")
        })

@ToString(exclude = {"contract"})
public class ContractItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "unit_id")
    private String unitId;

    @Column(name = "unit_name")
    private String unitName;

    @Column(name = "product_country", columnDefinition = "TEXT")
    private String productCountry;

    @Column(name = "position_type")
    private String positionType;

    @Column(name = "unit_amount")
    private Double unitAmount;

    @Column(name = "unit_currency")
    private String unitCurrency;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "currency")
    private String currency;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "classification_id")
    private Classification classification;

    @ManyToOne
    @JoinColumn(name = "contract_id")
    private Contract contract;


}
