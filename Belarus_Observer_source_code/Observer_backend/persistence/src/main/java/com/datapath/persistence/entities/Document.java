package com.datapath.persistence.entities;

import lombok.*;

import javax.persistence.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "document")
@ToString(exclude = {"tender"})
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", length = 1000)
    private String title;

    @Column(name = "description", length = 1000)
    private String description;

    @ManyToOne()
    @JoinColumn(name = "tender_id")
    private Tender tender;
}
