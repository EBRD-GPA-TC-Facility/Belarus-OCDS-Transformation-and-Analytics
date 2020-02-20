package com.datapath.persistence.entities;

import lombok.*;

import javax.persistence.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "award_item",
        indexes = {
                @Index(columnList = "classification_id", name = "award_item_classification_id_idx")
        })
@ToString(exclude = {"lot", "award"})
public class AwardItem {

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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "related_lot")
    private Lot lot;

    @Transient
    private Long relatedLot;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "award_id")
    private Award award;

    @Transient
    private Long awardId;

}
