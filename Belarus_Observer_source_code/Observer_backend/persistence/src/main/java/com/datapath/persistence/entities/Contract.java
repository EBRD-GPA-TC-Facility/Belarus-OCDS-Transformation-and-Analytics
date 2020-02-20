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
@Table(name = "contract",
        indexes = {
                @Index(columnList = "tender_id", name = "contract_tender_id_idx"),
                @Index(columnList = "supplier_id", name = "contract_supplier_id_idx"),
                @Index(columnList = "buyer_id", name = "contract_buyer_id_idx"),
        })
@ToString(exclude = {"tender", "items", "supplier", "buyer"})
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_signed", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private OffsetDateTime dateSigned;

    @Column(name = "date_created", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private OffsetDateTime dateCreated;

    @Column(name = "status")
    private String status;

    @Column(name = "procurement_method_details")
    private String procurementMethodDetails;

    @Column(name = "is_competitive")
    private Boolean isCompetitive;

    @Column(name = "contract_id")
    private Long contractId;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "title", columnDefinition = "TEXT")
    private String title;

    @Column(name = "funds", columnDefinition = "TEXT")
    private String funds;

    @ManyToOne()
    @JoinColumn(name = "tender_id")
    private Tender tender;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "currency")
    private String currency;

    @OneToMany(mappedBy = "contract", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ContractItem> items;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "buyer_id")
    private Party buyer;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "supplier_id")
    private Party supplier;


}
