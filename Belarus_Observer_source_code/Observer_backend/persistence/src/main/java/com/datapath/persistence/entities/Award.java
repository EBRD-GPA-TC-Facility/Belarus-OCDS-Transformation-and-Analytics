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
@Table(name = "award",
        indexes = {
                @Index(columnList = "tender_id", name = "award_tender_id_idx"),
                @Index(columnList = "winner_id", name = "award_winner_id_idx")
        })
@ToString(exclude = {"tender", "winner", "items"})
public class Award {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "award_id", columnDefinition = "TEXT")
    private String awardId;

    @Column(name = "date")
    private OffsetDateTime date;

    @Column(name = "contract_period_end_date")
    private OffsetDateTime contractPeriodEndDate;

    @Column(name = "contract_period_start_sate")
    private OffsetDateTime contractPeriodStartDate;

    @OneToMany(mappedBy = "award", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH}, orphanRemoval = true)
    private List<AwardItem> items;

    @ManyToOne
    @JoinColumn(name = "tender_id")
    private Tender tender;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "winner_id")
    private Party winner;


}

