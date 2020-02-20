package com.datapath.persistence.entities;

import lombok.*;

import javax.persistence.*;
import java.time.OffsetDateTime;
import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "lot", indexes = {
        @Index(columnList = "tender_id", name = "lot_tender_id_idx"),
        @Index(columnList = "status", name = "lot_status_idx"),
        @Index(columnList = "for_small_scale_business", name = "lot_for_small_scale_business_idx")
})
@ToString(exclude = {"tender", "awardItem", "tenderItem", "bids"})
public class Lot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "lot_id")
    private Long lotId;

    @Column(name = "currency")
    private String currency;

    @Column(name = "status")
    private String status;

    @Column(name = "delivery_period_start_date")
    private OffsetDateTime deliveryPeriodStartDate;

    @Column(name = "delivery_period_end_date")
    private OffsetDateTime deliveryPeriodEndDate;

    @Column(name = "for_small_scale_business")
    private Boolean forSmallScaleBusiness;

    @ManyToOne
    @JoinColumn(name = "tender_id")
    private Tender tender;

    @OneToMany(mappedBy = "lot")
    private List<Bid> bids;

    @OneToMany(mappedBy = "lot")
    private List<AwardItem> awardItem;

    @OneToMany(mappedBy = "lot")
    private List<TenderItem> tenderItem;

}
