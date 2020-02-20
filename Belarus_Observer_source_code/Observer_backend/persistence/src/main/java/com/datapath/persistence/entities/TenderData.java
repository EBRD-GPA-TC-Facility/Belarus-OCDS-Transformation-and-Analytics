package com.datapath.persistence.entities;

import lombok.*;

import javax.persistence.*;
@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tender_data")
@ToString(exclude = {"tender"})
public class TenderData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description", columnDefinition = "TEXT")
    private String data;

    @OneToOne
    @JoinColumn(name = "tender_id")
    private Tender tender;
}
