package com.datapath.persistence.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "classification",
        indexes = {
                @Index(columnList = "classification_id", name = "classification_classification_id_idx"),
                @Index(columnList = "classification_scheme", name = "classification_classification_id_idx"),
                @Index(columnList = "okrb_id", name = "classification_okrb_id_idx"),
        })

@ToString(exclude = {"tenderItems","contractItems","awardItems"})
public class Classification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "classification_id")
    private String classificationId;

    @Column(name = "classification_scheme", columnDefinition = "TEXT")
    private String classificationScheme;

    @Column(name = "classification_description", columnDefinition = "TEXT")
    private String classificationDescription;

    @OneToMany(mappedBy = "classification")
    private List<TenderItem> tenderItems;

    @OneToMany(mappedBy = "classification")
    private List<ContractItem> contractItems;

    @OneToMany(mappedBy = "classification")
    private List<AwardItem> awardItems;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "okrb_id")
    private OKRB okrb;

}
