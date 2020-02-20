package com.datapath.persistence.entities;

import lombok.*;

import javax.persistence.*;
import java.time.OffsetDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "bid",
        indexes = {
                @Index(columnList = "tender_id", name = "bid_tender_id_idx"),
                @Index(columnList = "related_lot", name = "bid_related_lot_idx")
        })
@ToString(exclude = {"tender", "lot", "tenderer"})
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "bid_id")
    private String bidId;

    @Column(name = "status")
    private String status;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "currency")
    private String currency;

    @Column(name = "date", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private OffsetDateTime date;

    @ManyToOne
    @JoinColumn(name = "tender_id")
    private Tender tender;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "related_lot")
    private Lot lot;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "tenderer_id")
    private Party tenderer;

    @Transient
    private Long relatedLot;


}


