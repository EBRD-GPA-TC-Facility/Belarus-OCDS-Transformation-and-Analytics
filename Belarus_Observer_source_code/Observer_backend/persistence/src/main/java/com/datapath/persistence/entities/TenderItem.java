package com.datapath.persistence.entities;

import lombok.*;

import javax.persistence.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tender_item",
        indexes = {
                @Index(columnList = "tender_id", name = "tender_item_tender_id_idx"),
                @Index(columnList = "classification_id", name = "tender_item_classification_id_idx")
        })
@ToString(exclude = {"tender", "lot"})
public class TenderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "unit_id")
    private String unitId;

    @Column(name = "unit_name")
    private String unitName;

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
    @JoinColumn(name = "tender_id")
    private Tender tender;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "related_lot")
    private Lot lot;

    @Transient
    private Long relatedLot;


}
