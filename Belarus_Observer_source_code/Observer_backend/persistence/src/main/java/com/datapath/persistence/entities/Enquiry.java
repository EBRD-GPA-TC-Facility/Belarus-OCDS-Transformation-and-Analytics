package com.datapath.persistence.entities;

import lombok.*;

import javax.persistence.*;
import java.time.OffsetDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "enquiry",
        indexes = {
                @Index(columnList = "tender_id", name = "enquiry_tendre_id_idx")
        })
@ToString(exclude = {"tender"})
public class Enquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private OffsetDateTime date;

    @Column(name = "date_answered", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private OffsetDateTime dateAnswered;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "answer", columnDefinition = "TEXT")
    private String answer;

    @ManyToOne()
    @JoinColumn(name = "tender_id")
    private Tender tender;
}
